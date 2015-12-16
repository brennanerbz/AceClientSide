import {
  CREATE_SET,
  CREATE_SET_SUCCESS,
  CREATE_SET_FAILURE,

  UPDATE_SET,
  UPDATE_SET_SUCCESS,
  UPDATE_SET_FAILURE,

  UPDATE_SETSUBJECTS_SUCCESS,
  UPDATE_SETSUBJECTS_FAILURE,

  CREATE_ASSIGNMENT,
  CREATE_ASSIGNMENT_SUCCESS,
  CREATE_ASSIGNMENT_FAILURE,

  UPDATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_SUCCESS,
  UPDATE_ASSIGNMENT_FAILURE,

  DELETE_ASSIGNMENT_SUCCESS,

  GET_TERM_SUGGESTIONS,
  TERM_SUGGESTIONS_SUCCESS,
  TERM_SUGGESTIONS_FAILURE,

  GET_DEF_SUGGESTIONS,
  DEF_SUGGESTIONS_SUCCESS,
  DEF_SUGGESTIONS_FAILURE,

  CREATE_ITEM,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILURE,

  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,

  CREATE_ASSOCIATION,
  CREATE_ASSOCIATION_SUCCESS,
  CREATE_ASSOCIATION_FAILURE,

  UPDATE_ASSOCIATION,
  UPDATE_ASSOCIATION_SUCCESS,
  UPDATE_ASSOCIATION_FAILURE,

	SAVE_TITLE,
	SAVE_PURPOSE,

	ADD_ROW,
	EDIT_ROW,

	DELETE_ROW,
  DELETE_ROW_SUCCESS,

	RESIZE,

  CLEAR_SET,

  SET_FLAG,
  TITLE_FLAG,

  CLEAR_DEF_CHOICES,

  LOAD_EDITING,
  LOAD_EDITING_SUCCESS,
  LOAD_EDITING_FAILURE,

  LOADING_SET,
  LOADED_VIEW,

  UNMOUNTING_CREATE,

  FINISHED_RENDERING
	
} from '../actions/createset';

export var createState = {
  cleared: false,
  isCreatingSet: false,
  isUpdatingSet: false,
  isCreatingItem: false,
  activeContext: true,
  set: null,
  assignment: null,
  deleted: false,
  title: '',
  id: null,
  purpose: '',
  subjects: [],
  creator_id: null,
  creator_username: '',

  order: 1,
  last_index: 1,
  associations: {
    asc_0: {
      order: 1,
      index: 0
    },
    asc_1: {
      order: 2,
      index: 1
    }
  },
  items: {},
  associations_order: [
    'asc_0', 'asc_1'
  ],
  associations_length: 2,

  current_item: null,
  current_association: null,
  current_order_index: null,
  term_choices: null,
  def_choices: null,
  flag: false,
  title_flag: false,
  /* Old State */
  activeRow: -1,
  mousePos: -1,
  resizing: false,
  scrolling: false,
  /* Editing */
  editing: false,
  isLoadingSet: true,
  check_subjects: false,
  unmounting: false,
  rendered: false,
  able_to_spark: true,
  isLoadingEditing: false
};

/* ---- Remove duplicates ----*/
function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

export function createset(state = createState, action) {
  switch (action.type) {
    case CREATE_SET:
      return {
        ...state,
        isCreatingSet: true
      }
    case LOAD_EDITING: 
      return {
        ...state,
        unmounting: false,
        able_to_spark: false
      }
    case LOAD_EDITING_SUCCESS:     
      let _subjects = [];
      if(action.set.subjects !== undefined) {
        action.set.subjects.forEach(sub => _subjects.push("#" + sub.name.toLowerCase().replace(" ", "")))
        _subjects = uniq_fast(_subjects)
      } else {
        _subjects = state.subs
      }
      let incoming_associations = action.associations,
          incoming_asc_order = action.associations_order,
          next_order = incoming_associations[incoming_asc_order.slice(-1)[0]].order + 1 

      if(incoming_asc_order.length == 0) {
        incoming_associations = state.associations
        incoming_asc_order = state.associations_order
        next_order = 1
      }
      if(incoming_asc_order.length == 1) {
        incoming_associations['asc_1'] = { 
          index: 1,
          order: 1
        }
        incoming_asc_order.push('asc_1')
        next_order = 2
      }

      return {
        ...state,
        editing: true,
        set: action.set,
        id: action.set.id,
        title: action.set.title,
        creator_id: action.set.creator_id,
        creator_username: action.set.creator.username,
        assignment: action.assignment,
        items: action.items,
        associations: incoming_associations,
        associations_order: incoming_asc_order,
        associations_length: incoming_asc_order.length,
        order: next_order,
        deleted: false,
        subjects: _subjects,
        isLoadingSet: false
      }
    case CREATE_SET_SUCCESS:
      if(state.cleared) return { ...state }
      const set = action.set
      return {
        ...state,
        isCreatingSet: false,
        set: set,
        id: set.id,
        title: set.title,
        creator_id: set.creator_id,
        creator_username: set.creator.username,
        check_subjects: true
      }
    case UPDATE_SET:
      return {
        ...state,
        isUpdatingSet: true
      }
    case UPDATE_SET_SUCCESS: 
      const updated_set = action.set;
      if(state.cleared) return { ...state }
      return {
        ...state,
        isUpdatingSet: false,
        set: updated_set,
        title: updated_set.title,
        purpose: updated_set.description,
        check_subjects: true
      }
    case UPDATE_SETSUBJECTS_SUCCESS:
      if(state.cleared) return { ...state }
      let _subs = [];
      if(action.subs !== undefined) {
        action.subs.forEach(sub => _subs.push("#" + sub.name.toLowerCase().replace(" ", "")))
        _subs = uniq_fast(_subs)
      } else {
        _subs = state.subs
      }
      return {
        ...state,
        isUpdatingSet: false,
        subjects: _subs,
        set: Object.assign({...state.set}, {subjects: _subs}),
        check_subjects: false
      }
    case CREATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignment: action.assignment
      }
    case DELETE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignment: null,
        deleted: true
      }
    case CREATE_ITEM:
      return {
        ...state,
        isCreatingItem: true
      }
    case CREATE_ITEM_SUCCESS: 
      let items = Object.assign({}, state.items) || {},
          item = action.item,
          i = action.index,
          id = item.id;
      items[id] = item;
      return {
        ...state,
        isCreatingItem: false,
        items: items,
        term_choices: null,
        check_subjects: true
      }
    case CREATE_ASSOCIATION_SUCCESS:
      if(state.cleared) return { ...state }
      let associations = state.associations,
          associations_order = state.associations_order, 
          order = state.order,
          association = action.association,
          index = action.index,
          association_id = association.id,
          ref = action.ref,
          __id = association.id,
          __item = state.items[association.item_id],
          __item_id = __item.id,
          fe_association = {
            id: __id,
            association: association,
            item: __item,
            item_id: __item_id,
            order: order,
            index: index
          }
      associations[ref] = fe_association
      associations_order.splice(i, ref);
      return {
        ...state,
        associations: associations,
        order: state.order + 1,
        associations_order: associations_order,
        associations_length: associations_order.length
      }
    case UPDATE_ITEM_SUCCESS:
      if(state.cleared) return { ...state }
      let updated_items = Object.assign({}, state.items),
          _associations = Object.assign({}, state.associations),
          updated_item = action.item,
          item_id = updated_item.id;
      updated_items[item_id] = updated_item
      for(var prop in _associations) {
        let p = _associations[prop];
        if(p['item_id'] == item_id) {
          p['item'] = updated_item
        }
      }
      return {
        ...state,
        items: updated_items,
        associations: _associations,
        check_subjects: true
      }
    case UPDATE_ASSOCIATION_SUCCESS:
      if(state.cleared) return { ...state }
      let updated_associations = Object.assign({}, state.associations),
          updated_association = action.association,
          asc_ref = action.ref;
          updated_associations[asc_ref].association = updated_association;
      return {
        ...state,
        associations: updated_associations
      }
    case TERM_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        term_choices: action.terms
      }
    case DEF_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        def_choices: action.items
      }
    case CLEAR_DEF_CHOICES:
      return {
        ...state,
        def_choices: null
      }
    case ADD_ROW:
      let asc_order = state.associations_order,
          ascs = Object.assign({}, state.associations),
          new_asc = 'asc_' + Number(state.last_index + 1) 
      asc_order.push(new_asc)
      ascs[new_asc] = {
        index: state.last_index + 1,
      }
      return {
        ...state,
        activeRow: asc_order.indexOf(new_asc),
        last_index: Number(state.last_index + 1),
        associations: ascs,
        associations_order: asc_order,
        associations_length: asc_order.length,
        able_to_spark: true
      }
    case SET_FLAG: 
      return {
        ...state,
        flag: action.flag
      }
    case TITLE_FLAG:
      return {
        ...state,
        title_flag: action.flag
      }
    case DELETE_ROW_SUCCESS:
      let deleted_asc = action.asc,
          u_associations = Object.assign({}, state.associations),
          u_order = state.associations_order,
          _ref = action.ref;
      delete u_associations[_ref]
      u_order = u_order.filter((asc, i) => i !== action.index)
      return {
        ...state,
        associations: u_associations,
        associations_order: u_order,
        associations_length: u_order.length,
        order: state.order - 1
      }
    case SAVE_TITLE:
      return {
        ...state,
        title: action.title
      }
    case SAVE_PURPOSE:
      return {
        ...state,
        purpose: action.purpose
      }
    case RESIZE:
      return {
        ...state,
        resizing: !state.resizing
      }
    case UNMOUNTING_CREATE:
      return {
        ...state,
        unmounting: true
      }
    case CLEAR_SET:
      return {
        ...state = createState,
        rows: [null, null],
        cleared: true
      }
    case LOADING_SET: 
      return {
        ...state,
        isLoadingSet: true,
        cleared: false
      }
    case LOADED_VIEW:
      return {
        ...state,
        isLoadingSet: false
      }
    case FINISHED_RENDERING:
      return {
        ...state,
        rendered: true
      }
    case UPDATE_ASSOCIATION_FAILURE:
    case TERM_SUGGESTIONS_FAILURE:
    case UPDATE_SETSUBJECTS_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case CREATE_ASSOCIATION_FAILURE:
    case CREATE_ITEM_FAILURE:
    case UPDATE_SET_FAILURE:
    case CREATE_SET_FAILURE:
    default:
      return state;
  }
}


