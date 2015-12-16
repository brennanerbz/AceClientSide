import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TermContent extends Component {
	static propTypes = {
		/* TODO: add all propTypes */
	}

    state = {
        term: null,
        definition: null,
        triggered: false,
        asc_id: null
    }

    loadItem(item) {
        if(item !== undefined && item !== null) {
            if(item.target !== null) this.setState({ term: item.target })
            if(item.cue !== null) this.setState({ definition: item.cue })
        }
    }

    trigger(node1, node2) {
        $(node1).add(node2).trigger('input')
    }

    componentDidMount() {
        const { item, active_row, active_side, index, total_count, rendered } = this.props;
        this.loadItem(item) 
        let term_node = this.refs[`autocomplete_term_${index}`],
            def_node = this.refs[`autocomplete_def_${index}`]
        if(active_row && active_side == 0) {
            term_node.focus()
        }
        /* Autosizing textarea */
        $(term_node).add(def_node).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        })
        setTimeout(() => {
            this.trigger(term_node, def_node)
            if(index == total_count - 1) { 
                this.props.finishedRendering() 
            }
        }, 1)
        this.setState({
            asc_id: this.props.asc_id
        });
    }

    componentWillReceiveProps(nextProps) {
        const { index, item, total_count } = this.props;
        let term_node = this.refs[`autocomplete_term_${index}`],
            def_node = this.refs[`autocomplete_def_${index}`]
        if(nextProps.resizing) {
            this.trigger(term_node, def_node)
            return;
        }
        if(!this.state.triggered) {
           this.trigger(term_node, def_node)
           this.setState({triggered: true}); 
        }

        if(this.state.asc_id !== nextProps.asc_id) {
            this.setState({
                asc_id: nextProps.asc_id
            })
            if(nextProps.association.item_id == undefined) {
                this.setState({
                    term: '',
                    definition: ''
                })
            }
            if(nextProps.association.item_id !== undefined) {
                this.setState({
                    term: nextProps.association.item.target,
                    definition: nextProps.association.item.cue
                });
            }
        }
    } 
    render() {
        const { active_row, index } = this.props;
      	return (
            <div className={classnames({"TermContent-focus": active_row, "TermContent": !active_row} )}>
                <div className="TermContent-wrap">          
                    <div className={classnames("TermContent-side", {"word-side-focus": active_row}, {'word-side': !active_row})}
                         ref={`termContentWord${index}`}
                         onClick={() => { 
                            this.props.activateRow()
                            this.props.focusSide(0)
                            this.refs[`autocomplete_term_${index}`].focus()
                        }}>
                        <textarea
                            className="AutoExpandTextArea-textarea"
                            ref={`autocomplete_term_${index}`}
                            tabIndex={2}
                            rows="1"
                            onFocus={() => {
                                this.props.activateRow()
                                this.props.focusSide(0)
                            }}
                            onChange={(e) =>{
                                this.setState({term: e.target.value});
                            }}
                            onInput={(e) => {

                            }}
                            onBlur={() => {
                                if(this.state.term !== null && this.state.term.length > 0) {
                                    this.props.saveTerm(this.state.term) 
                                }
                                this.props.deactivateRow()
                            }}
                            value={ this.state.term }
                        />                                
                    </div>
                    <div className="TermContent-side def-side" 
                         ref={`termContentDef${index}`}
                         onClick={() => { 
                            this.props.activateRow()
                            this.props.focusSide(1)
                            this.refs[`autocomplete_def_${index}`].focus()
                         }}>
                        <textarea
                            className="AutoExpandTextArea-textarea"
                            ref={`autocomplete_def_${index}`}
                            tabIndex={2}
                            rows="1"
                            onFocus={() => {
                                this.props.activateRow()
                                this.props.focusSide(1)
                            }}
                            onKeyDown={(e) => {
                                if(this.props.index !== this.props.total_count -1) return;
                                if(e.which == 9) {
                                    e.preventDefault()
                                    if(this.props.index == this.props.total_count - 1) 
                                        this.props.addRow()
                                }
                            }}
                            onChange={(e) =>{
                                this.setState({definition: e.target.value});
                            }}
                            onBlur={() => {
                                if(this.state.definition !== null && this.state.definition.length > 0){
                                   this.props.saveDefinition(this.state.definition) 
                                }
                                this.props.deactivateRow()
                            }}
                            value={ this.state.definition }
                        />
                    </div>
                </div>
            </div>
  	    );
    }
}

// item={this.state.item}
// index={this.state.index}
// total_count={this.props.total_count}
// active_row={this.state.active_row}
// active_side={this.state.active_side}
// activateRow={() => this.setState({ active_row: true })}
// deactivateRow={() => this.setState({ active_row: false })}
// focusSide={(value) => this.setState({ active_side: value })}
// enterTerm={(term) => this.setState({ term: term}) }
// saveTerm={this.saveTerm}
// enterDefinition={(def) => this.setState({definition: def})}
// saveDefinition={this.saveDefinition}
// addRow={this.props.addRow} 



/*           
// computeStyle = () => {
//     let { index, active_side, subjects } = this.props,
//           node, rect;
//     if(subjects == (undefined || null)) return;

//     if (active_side === 0) { node = this.refs['termContentWord' + index] } 
//     else { node = this.refs['termContentDef' + index] }

//     rect = node.getBoundingClientRect();
//     return rect;
// }
*/

/*

*/

/*  --------- Definition ------------

items={term_choices !== undefined ? term_choices : []}
getItemValue={(item) => item}
onSelect={(value, item) => {
    this.setState({ terms: [ item ] })                                     
}}
onInput={(event, value) => {
    if(subjects !== undefined && subjects.length > 0) {
    this.setState({loading: true})
        getTermSuggestions(value, (items) => {
            this.setState({ terms: items, loading: false })
        })
    }
}}
renderItem={(term, isHighlighted, index) => (
    <div className={classnames({ 'first_item': index == 0 })}
         style={isHighlighted ? styles.highlightedItem : styles.item}
         key={term.abbr}
         id={term.abbr}>
         {term}
    </div>
)}
---------------------- ---------*/


/*  --------- Definition ------------
items={def_choices !== undefined ? def_choices : []}
getItemValue={(_item) => _item.cue}
onSelect={(value, _item) => {
    this.setState({ defs: [ _item.cue ]})
    updateAssociation(association, 
    {name: 'item', prop: _item}, 
    {name: 'item_id', prop: _item.id },
    {name: 'item_adopted', prop: true})
}}
onInput={(event, value) => value}
onFocus={(event, value) => {
    if(subjects !== undefined && subjects.length > 0 && item !== null) {
        this.setState({loading: true})
        getDefSuggestions(item.id)
        setTimeout(() => {
            getDefSuggestions(item.id)
        }, 250)
    }
}}
renderItem={(_item, isHighlighted, index) => (
    <div className={classnames({ 'first_item': index == 0 })}
         style={isHighlighted ? styles.highlightedItem : styles.item}
         key={_item.abbr}
         id={_item.abbr}>
         {_item.cue}
    </div>
)}
---------------------- ---------*/
             