import axios from 'axios';
import request from 'superagent';
import moment from 'moment'; 
import _ from 'lodash';

const server = require('./api'),
	  api_url = server.api_url;

// /sets/<int: set_id>/associations/
// /users/<int: user_id>/assignments/					GET
// /assignments/<int: assignment_id>	
export const FETCH_CREATE_SET = 'FETCH_CREATE_SET';
export function fetchSet(user_id, set_id, pushState) {
	return async(dispatch, getState) => {
		dispatch({type: FETCH_CREATE_SET})
		try {
			let set = {}, items = {}, associations = {}, associations_order = [],
			assignment = await getState().sets.assignments.filter(assign => assign.set_id == set_id)[0]
			await axios.get(`${api_url}/sets/${set_id}`).then(res => { 
				set = res.data 
			})
			await axios.get(`${api_url}/assignments/${assignment.id}`).then((res) => {
				assignment = res.data
			}) 
			
			assignment.set.associations.associations.forEach((asc, i) => {
				let root_asc_name = 'asc_' + i
				items[asc.item_id] = asc.item
				associations[root_asc_name] = {
					association: asc,
					item: asc.item,
					item_id: asc.item_id,
					order: i + 1,
					index: i
				}
				associations_order.push(root_asc_name)
			})
			if(set.editability == 'creator' && set.creator_id !== user_id) {
				pushState(null, '/')
				return;
			}
			dispatch({type: LOAD_EDITING_SUCCESS, set, assignment, items, associations, associations_order})
		} catch(err) {
			if(err.status == 404) pushState(null, '/error')
			dispatch({
				type: LOAD_EDITING_FAILURE,
				error: Error(err),
				err: err
			})
		}
	}
}


/*
---Load the transfer state if editing ----
*/
export const LOAD_EDITING = 'LOAD_EDITING';
export const LOAD_EDITING_SUCCESS = 'LOAD_EDITING_SUCCESS';
export const LOAD_EDITING_FAILURE = 'LOAD_EDITING_FAILURE';
export function loadEditing(set_id, pushState) {
	return async(dispatch, getState) => {
		dispatch({ type: LOAD_EDITING, true })
		try {
			let transferState = getState().transfer,
				user = getState().user.user,
				set, assignment, items = {}, associations = {}, associations_order = [];
			if(Object.keys(user).length == 0) { setTimeout(() => { 
				dispatch(loadEditing(set_id, pushState))
				return;
			}, 250)}
			if(transferState.set !== null && transferState.set !== undefined) {
				if(transferState.set.id == set_id) {
					set = transferState.set
					assignment = transferState.assignment
					transferState.associations.forEach(asc => {
						let root_asc_name = 'asc_' + i
						items[asc.item_id] = asc.item
						associations[root_asc_name] = {
							association: asc,
							item: asc.item,
							item_id: asc.item_id,
							order: i + 1,
							index: i
						}
						associations_order.push(root_asc_name)
					})
					if(set.editability == 'creator' && set.creator_id !== user.id) {
						pushState(null, '/error')
						return;
					}
					setTimeout(() => {
						dispatch({ type: LOAD_EDITING_SUCCESS, set, assignment, items, associations, associations_order })
					}, 50)
				}
			} else {
				dispatch(fetchSet(user.id, set_id, pushState))
			}	
		} catch(err) {
			pushState(null, '/error')
			dispatch({
				type: LOAD_EDITING_FAILURE,
				error: Error(err)
			})
		}
	}
}



/*
@params: { 	

'parent_id':  Integer,
'creator_id':  Integer,
'source_id':  Integer,
‘targets_lang_id’: Integer,
‘cues_lang_id’: Integer,
'title':  String,
'description':  String,
‘has_images’: Boolean,
'official':  Integer,
'visibility':  String,			‘public’ | ‘private’
‘editability’: String,			‘group’ | ‘admin’ | ‘creator’

}
*/
var _settemplate = {
	parent_id: null,
	creator_id: null,
	source_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	title: null,
	description: null,
	has_images: false,
	official: null,
	visibility: 'public',
	editability: 'creator'
}

export const CREATE_SET = 'CREATE_SET';
export const CREATE_SET_SUCCESS = 'CREATE_SET_SUCCESS';
export const CREATE_SET_FAILURE = 'CREATE_SET_FAILURE';
export function createSet(title, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: CREATE_SET})
		try {
			// TODO: check the method its being called whether from create page or copy
			let user = getState().user.user,
				set = Object.assign({..._settemplate}, {
					creator_id: user.id,
					title: title || 'Untitled'
				})
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(set.hasOwnProperty(name)) {
						set[name] = prop
					}
				}
			}
			await axios.post(`${api_url}/sets/`, 
				set
			)
			.then(res => set = res.data)
			dispatch({type: CREATE_SET_SUCCESS, set})
			if(set.title !== 'Untitled') {
				// dispatch(updateSetSubjects())
			}
		} catch(err) {
			dispatch({
				type: CREATE_SET_FAILURE,
				error: Error(err),
				typeerr: err
			})
		}
	}
}


/*
@params:
	
'source_id':  Integer,
‘targets_lang_id’: Integer,
‘cues_lang_id’: Integer,
'title':  String,
'description':  String,
‘has_images’: Boolean,
'official':  Integer,
'visibility':  String,			‘public’ | ‘private’
‘editability’: String,			‘group’ | ‘admin’ | ‘creator’

*/
var set_update_values = {
	source_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	title: null,
	description: null,
	has_images: null,
	official: null,
	visibility: null,
	editability: null,
	finalized: null
}

export const UPDATE_SET = 'UPDATE_SET';
export const UPDATE_SET_SUCCESS = 'UPDATE_SET_SUCCESS';
export const UPDATE_SET_FAILURE = 'UPDATE_SET_FAILURE';
export function updateSet(_set, ...args) {
	return (dispatch, getState) => {
		dispatch({type: UPDATE_SET})
		let set = Object.assign({}, set_update_values);
		for(var key in set) {
			if(_set[key]) {
				set[key] = _set[key]
			}
		}
		if(args !== null && args.length > 0) {
			for(var i = 0; i < args.length; i++) {
				let arg = args[i],
					name = arg.name,
					prop = arg.prop;
				if(set.hasOwnProperty(name)) {
					set[name] = prop
				}
			}
		}
		request
		.put(`${api_url}/sets/${_set.id}`)
		.send(set)
		.end((err, res) => {
			if(res.ok) {
				set = res.body
				dispatch({type: UPDATE_SET_SUCCESS, set})	
			} else {
				dispatch({
					type: UPDATE_SET_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}


// { "subjects": [name, name name] }
export const UPDATE_SETSUBJECTS_SUCCESS = 'UPDATE_SETSUBJECTS_SUCCESS';
export const UPDATE_SETSUBJECTS_FAILURE = 'UPDATE_SETSUBJECTS_FAILURE';
export function updateSetSubjects(subjects, set) {
	return (dispatch, getState) => {
		// dispatch({type: UPDATE_SET})
		try {
			var subs,
				set = set == undefined ? getState().createset.set : set;
			if(subjects !== undefined) {
				subs = { subjects: subjects };
				axios.put(`${api_url}/sets/${set.id}/edit-subjects/`, subs)
				.then((res) => {
					subs = res.data.subjects
					dispatch({ type: UPDATE_SETSUBJECTS_SUCCESS, subs })
					return;
				})
			}
			axios.put(`${api_url}/sets/${set.id}/subjects/`)
			.then((res) => { 
				subs = res.data.subjects
				dispatch({type: UPDATE_SETSUBJECTS_SUCCESS, subs})
			})
		} catch(err) {
			dispatch({
				type: UPDATE_SETSUBJECTS_FAILURE,
				error: Error(err)
			})
		}
	}
}



/*
@params: 

'user_id':  Integer,  ** required
'set_id':  Integer, ** required
‘new_sequence_difficulty’: String,	‘beginner’ | ‘novice’ | ‘intermediate’ | ‘advanced’ | ‘expert’ | ‘master’
‘starred’: Boolean,
‘deadline’: String,
‘wallpaper’: String,
‘permission’: String,			‘admin’ | ‘nonadmin’
‘privacy’: String,			‘public’ | ‘group’ | ‘private’

*/
var _assignmenttemplate = {
	user_id: null,
	set_id: null,
	new_sequence_difficulty: 'intermediate',
	starred: false,
	deadline: null,
	wallpaper: null,
	permission: 'nonadmin',
	privacy: 'public'
}
export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'CREATE_ASSIGNMENT_FAILURE';
export function createAssignment(set_id, permission, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: CREATE_ASSIGNMENT})
		try {
			let user_id = getState().user.user.id,
				assignment = Object.assign({..._assignmenttemplate}, {
					user_id: user_id,
					set_id: set_id,
					permission: permission || 'nonadmin'
				}) 
			await axios.post(`${api_url}/assignments/`, 
				assignment
			)
			.then(res => assignment = res.data)
			dispatch({type: CREATE_ASSIGNMENT_SUCCESS, assignment})
			if(args.length > 0 && args[0].name == 'navigate' && args[0].prop) {
				let pushState = args[1]
				setTimeout(() => {
					pushState(null, `/set/${assignment.set_id}`)
				}, 5)
			}
		} catch(err) {
			dispatch({
				type: CREATE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*

‘new_sequence_difficulty’: String,	‘beginner’ | ‘novice’ | ‘intermediate’ | ‘advanced’ | ‘expert’ | ‘master’
‘starred’: Boolean,
‘deadline’: String,
‘wallpaper’: String,
‘permission’: String,			‘admin’ | ‘nonadmin’
‘privacy’: String,			‘public’ | ‘group’ | ‘private’

*/
export const UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT';
export const UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
export const UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';
export function updateAssignment(...args) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_ASSIGNMENT})
		try {
			let assignment = getState().createset.assignment;
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(assignment.hasOwnProperty(name)) {
						assignment[name] = prop
					}
				}
			}
			await axios.put(`${api_url}/assignments/${assignment.id}`, 
				assignment
			)
			.then(res => assignment = res.data)
			dispatch({type: UPDATE_ASSIGNMENT_SUCCESS, assignment})
		} catch(err) {
			dispatch({
				type: UPDATE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}


// /assignments/<int: assignment_id>
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
export const DELETE_ASSIGNMENT_SUCCESS = 'DELETE_ASSIGNMENT_SUCCESS';
export const DELETE_ASSIGNMENT_FAILURE = 'DELETE_ASSIGNMENT_FAILURE';
export function deleteAssignment(assignment_id, pushState) {
	return async(dispatch, getState) => {
		dispatch({ type: DELETE_ASSIGNMENT })
		try {
			await axios.delete(`${api_url}/assignments/${assignment_id}`).then(res => {
				dispatch({type: DELETE_ASSIGNMENT_SUCCESS})
				pushState(null, '/')
			})
		} catch(err) {
			dispatch({
				type: DELETE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params:
?target=String &subjects="list1|list2"	
*/
export const GET_TERM_SUGGESTIONS = 'GET_TERM_SUGGESTIONS';
export const TERM_SUGGESTIONS_SUCCESS = 'TERM_SUGGESTIONS_SUCCESS';
export const TERM_SUGGESTIONS_FAILURE = 'TERM_SUGGESTIONS_FAILURE';
export function getTermSuggestions(value) {
	return async(dispatch, getState) => {
		dispatch({type: GET_TERM_SUGGESTIONS})
		try {
			let terms,
				subjects = [],
				subs = getState().createset.subjects;
			if(value.length === 0) return;
			if(subs == undefined || subs.length === 0) {
				return;
			}
			subs.forEach(sub => subjects.push(sub.name))
			subjects.join("|")
			await axios.get(`${api_url}/terms/?search=${value}&subjects=${subjects}`)
		    .then(res => terms = res.data.terms)
			dispatch({type: TERM_SUGGESTIONS_SUCCESS, terms})
		} catch(err) {
			dispatch({
				type: TERM_SUGGESTIONS_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params:
?target=String &subjects="list1|list2"	
*/
export const GET_DEF_SUGGESTIONS = 'GET_DEF_SUGGESTIONS';
export const DEF_SUGGESTIONS_SUCCESS = 'DEF_SUGGESTIONS_SUCCESS';
export const DEF_SUGGESTIONS_FAILURE = 'DEF_SUGGESTIONS_FAILURE';
export function getDefSuggestions(id, target) {
	return async(dispatch, getState) => {
		dispatch({type: GET_DEF_SUGGESTIONS})
		try {
			let items,
				term,
				subjects = [],
				subs = getState().createset.subjects,
				def_choices = getState().createset.def_choices;
			if(subs == undefined || subs.length === 0) return;
			if(id == null) {
				term = target
			} else {
				term = getState().createset.items[id].target
			}
			term = term.toLowerCase().trim()
			subs = subs.join("|").replace(new RegExp(/#/g), "")
			// TODO: Use subjects for filtering
			// &subjects=${subs}
			await axios.get(`${api_url}/items/?target=${term}`)
			.then(res => { 
				items = res.data.items
				dispatch({type: DEF_SUGGESTIONS_SUCCESS, items})
			})
		} catch(err) {
			dispatch({
				type: DEF_SUGGESTIONS_FAILURE,
				error: Error(err)
			})
		}
	}
}
export const CLEAR_DEF_CHOICES = 'CLEAR_DEF_CHOICES';
export function clearDefChoices() {
  return {
    type: CLEAR_DEF_CHOICES
  };
}

/*

‘parent_id’: Integer,
‘creator_id’: Integer, **required
‘target_lang_id’: Integer,
‘cue_lang_id’: Integer,
‘target’: String,
‘cue’: String,
‘synonyms’: String,
‘image’: String,
‘message’: String,
‘official’: Boolean,
‘visibility’: String,		‘public’ | ‘private’

*/

var _itemtemplate = {
	parent_id: null,
	creator_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	target: null,
	cue: null,
	synonyms: null,
	image: null,
	message: null,
	official: false,
	visibility: 'public'
}
export const CREATE_ITEM = 'CREATE_ITEM';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';
export function createItem(index, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: CREATE_ITEM})
		try {                                                                                                            
			let item = Object.assign({}, _itemtemplate),
				user = getState().user.user,
				set  = getState().createset.set,
				id,
				association = {},
				ref;

			if(set == undefined) {
				await dispatch(createSet())
				setTimeout(() => {
					dispatch(createItem(index, ...args))
				}, 5)
				return; 
			}

			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(name == 'child') {
						item = Object.assign({...item}, {
							parent_id: prop.id,
							target: prop.target,
							cue: prop.cue,
							synonyms: prop.synonyms !== null ? prop.synonyms.join("|") : null,
							image: prop.image,
							message: prop.message,
							visibility: prop.visibility
						})
					}
					if(item.hasOwnProperty(name)) {
						item[name] = prop
					}
					if(name == 'association') {
						association = prop
					}
					if(name == 'association_ref') {
						ref = prop
					}
				}
			}
			item.creator_id = user.id
			await axios.post(`${api_url}/items/`, item)
			.then(res => item = res.data)
			if(Object.keys(association).length == 0) {
				await dispatch({type: CREATE_ITEM_SUCCESS, item, index})
				await dispatch(createAssociation(item.id, index, ref))
			} else {
				await dispatch({type: CREATE_ITEM_SUCCESS, item, index})
				await dispatch(updateAssociation(association.association, 
												ref,
												{name: 'item', prop: item}, 
												{name: 'item_id', prop: item.id}))
			}
			// if(item.target !== null) {
			// 	await dispatch(getDefSuggestions(null, item.target))
			// }
		} catch(err) {
			dispatch({
				type: CREATE_ITEM_FAILURE,
				error: Error(err)
			})
		}
	}
}

// createItem(index, {name: 'child', prop: item}, {name: 'cue', prop: def})

/*

@params:
‘target_lang_id’: Integer,
‘cue_lang_id’: Integer,
‘target’: String,
‘cue’: String,
‘synonyms’: String,
‘image’: String,
‘message’: String,
‘official’: Boolean,
‘visibility’: String, ‘public’ | ‘private’

*/
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';
export function updateItem(_item, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_ITEM})
		try {
			let item = Object.assign({}, _item)
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(item.hasOwnProperty(name)) {
						item[name] = prop
					}
				}
			}
			await axios.put(`${api_url}/items/${item.id}`, item)
			.then(res => item = res.data)
			dispatch({type: UPDATE_ITEM_SUCCESS, item})
		} catch(err) {
			dispatch({
				type: UPDATE_ITEM_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params:

'set_id':  Integer, **required
'item_id':  Integer, **required
'order':  Integer
‘message’: String,
‘has_image’: Boolean

*/
var _associationtemplate = {
	set_id: null,
	item_id: null,
	order: null,
	message: null,
	has_image: false
}
export const CREATE_ASSOCIATION = 'CREATE_ASSOCIATION';
export const CREATE_ASSOCIATION_SUCCESS = 'CREATE_ASSOCIATION_SUCCESS';
export const CREATE_ASSOCIATION_FAILURE = 'CREATE_ASSOCIATION_FAILURE';
export function createAssociation(item_id, index, ref) {
	return async(dispatch, getState) => {
		try {
			let set_id = getState().createset.set.id,
				order = getState().createset.order,
				association;
			
			association = Object.assign({..._associationtemplate}, {
				item_id: item_id,
				set_id: set_id,
				order: order
			})
			await axios.post(`${api_url}/associations/`, association)
			.then(res => { 
				association = res.data
				dispatch({type: CREATE_ASSOCIATION_SUCCESS, association, index, ref})
			})
		} catch(err) {
			dispatch({
				type: CREATE_ASSOCIATION_FAILURE,
				error: Error(err),
				err: err
			})
		}
	}
}

/*
@params: 

'order':  Integer
‘message’: String,
‘has_image’: Boolean

*/
export const UPDATE_ASSOCIATION = 'UPDATE_ASSOCIATION';
export const UPDATE_ASSOCIATION_SUCCESS = 'UPDATE_ASSOCIATION_SUCCESS';
export const UPDATE_ASSOCIATION_FAILURE = 'UPDATE_ASSOCIATION_FAILURE';
export function updateAssociation(asc, ref, ...args) {
	return async(dispatch, getState) => {
		try {
			let association = Object.assign({}, asc),
				adopted = false;
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(name == 'item_adopted') {
						adopted = true;
					}
					if(association.hasOwnProperty(name)) {
						association[name] = prop
					}
				}
			}
			await axios.put(`${api_url}/associations/${association.id}`, association)
			.then(res => association = res.data)
			dispatch({type: UPDATE_ASSOCIATION_SUCCESS, association, adopted, ref})
		} catch(err) {
			dispatch({
				type: UPDATE_ASSOCIATION_FAILURE,
				error: Error(err)
			})
		}
	}
}


// /associations/<int: association_id>	
export const DELETE_ROW = 'DELETE_ROW'
export const DELETE_ROW_SUCCESS = 'DELETE_ROW_SUCCESS'
export const DELETE_ROW_FAILURE = 'DELETE_ROW_FAILURE'
export function deleteRow(index, asc, ref) {
	return async(dispatch, getState) => {
		dispatch({type: DELETE_ROW})
		try {
			if(asc.association !== undefined) {
				await axios.delete(`${api_url}/associations/${asc.association.id}`).then(() => {
					dispatch({type: DELETE_ROW_SUCCESS, index, asc, ref})
				})
				dispatch(reorder())
			}
			else {
				dispatch({type: DELETE_ROW_SUCCESS, index, asc, ref})
			}
		} catch(err) {
			dispatch({
				type: DELETE_ROW_FAILURE,
				error: Error(err)
			})
		}
	}
}



/*/sets/<int: set_id>/associations/reorder	
{ 	
‘associations’: [
				{
		 			‘association_id’: Integer,
					‘order’: Integer
				}, ...
			]
}
*/
export const REORDER = 'REORDER';
export const REORDER_SUCCESS = 'REORDER_SUCCESS';
export const REORDER_FAILURE = 'REORDER_FAILURE';
export function reorder() {
	return async(dispatch, getState) => {
		dispatch({type: REORDER})
		try {
			let acs = { associations: [] },
				current_associations = getState().createset.associations,
				associations_order = getState().createset.associations_order,
				set_id = getState().createset.id
			for(var i = 0; i < associations_order.length; i++) {
				if(current_associations[associations_order[i]].item_id !== undefined) {
					acs.associations.push({
						id: current_associations[associations_order[i]].association.id,
						order: i + 1
					})
				}
			}
			if(acs.associations.length == 0) return;
			await axios.put(`${api_url}/sets/${set_id}/associations/reorder`, acs)
		} catch(err) {
			dispatch({
				type: REORDER_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const SET_FLAG = 'SET_FLAG';
export function setFlag(flag) {
	return {
		type: SET_FLAG,
		flag
	}
}

export const TITLE_FLAG = 'TITLE_FLAG';
export function setTitleFlag(flag) {
	return {
		type: TITLE_FLAG,
		flag
	}
}

import { createState } from '../reducers/createset';
export const CLEAR_SET = 'CLEAR_SET';
export function clearSet() {
	return (dispatch, getState) => {
		let current_state = getState().createset;
		dispatch({type: CLEAR_SET}) 
		if(!_.isEqual(current_state, current_state)) {
			setTimeout(() => {
				dispatch(clearSet()) 
			}, 500)
		}
	}
}
export const LOADING_SET = 'LOADING_SET';
export function loadSetFlag() {
	return (dispatch, getState) => {
		dispatch({ type: LOADING_SET})
	}
}
export const LOADED_VIEW = 'LOADED_VIEW'
export function loadedView() {
	return {
		type: LOADED_VIEW
	}
}

export const ADD_ROW = 'ADD_ROW'
export function addRow() {
  return {
    type: ADD_ROW
  };
}


export const FINISHED_RENDERING = 'FINISHED_RENDERING';
export function finishedRendering() {
	return {
		type: FINISHED_RENDERING
	}
}

export const UNMOUNTING_CREATE = 'UNMOUNTING_CREATE'
export function unMountingCreate() {
	return (dispatch, getState) => {
		dispatch({type: UNMOUNTING_CREATE})
	}
}

export const SAVE_TITLE = 'SAVE_TITLE'
export function saveTitle(title) {
	return {
		type: SAVE_TITLE,
		title
	}
}

export function savePurpose(purpose) {
	return {
		type: SAVE_PURPOSE,
		purpose
	}
}

export const RESIZE = 'RESIZE'
export function resize() {
	return {
		type: RESIZE
	}
}