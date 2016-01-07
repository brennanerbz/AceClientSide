import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import BubbleDropdown from '../../Dropdown/Dropdown';

export default class ButtonGroup extends Component {
	static propTypes = {
		onSave: PropTypes.func
	}

    state = {
        moreMenuIsOpen: false,
        mouseIsOverMoreButton: false
    }

	render() {
        const { onSave, set, editing, pushState, assignment, rendered, toggleModal } = this.props,
        { mouseIsOverMoreButton } = this.state,
        member_icon = require('../../../assets/profile_icon.png'),
        share_icon = require('../../../assets/share.png'),
        more = require('../../../assets/elipses.png'),
        blue_more = require('../../../assets/blue_elipses.png')
		return(
			<div className={classnames("CreateSetHeader-wrapper-buttongroup", {'rendered': rendered})}>
        		<div className="Button-set">
                    {
                        editing && assignment !== null
                        ? 
                        <button className={classnames("button primary")}
                                onClick={onSave}>
                                Done
                        </button>
                        : null
                    }
                    {
                        !editing
                        ? 
                        <button className={classnames("button primary")}
                                onClick={onSave}>
                                Create
                        </button>
                        : null
                    }
                    {
                        !editing
                        && assignment == null
                        &&
                        <button
                            style={{
                                marginLeft: '5px',
                                marginRight: '0px'
                            }}
                            className="button outline"
                            onClick={() => toggleModal('import')}>
                            Import
                            <span className="new_label">
                                New!
                            </span>
                        </button>
                    }
                    {
                        this.props.assignment !== null
                        &&
                        <button className={classnames('button outline')}
                                onClick={() => toggleModal('share')}
                                style={{
                                    marginLeft: '5px'
                                }}
                                ref="share"                
                                title="Share"
                                data-placement="bottom">
                            Share                   
                        </button>
                    }
                    <button onClick={() => { 
                                this.setState({moreMenuIsOpen: true})
                            }} 
                            style={{
                                marginLeft: '5px',
                                height: '36px',
                                width: '36px'
                            }}
                            onMouseOver={() => this.setState({
                                mouseIsOverMoreButton: true
                            })}
                            onMouseLeave={() => this.setState({
                                mouseIsOverMoreButton: false
                            })}
                            className={classnames('button outline',  {'active': this.state.moreMenuIsOpen})}
                            ref="more"                 
                            title="More actions"
                            data-placement="bottom" >
                            <img style={
                                {
                                    position: 'absolute',
                                    height: '4.05px',
                                    width: '16.25px',
                                    left: '9.5px'
                                }
                            } className="share_icon" src={mouseIsOverMoreButton ? blue_more : more}/>
                    </button>
                    {
                        this.state.moreMenuIsOpen
                        &&
                        <BubbleDropdown 
                            single_set_actions={true}
                            set_header={this.props.set_header}
                            target_node={this.refs.more}
                            pushState={this.props.pushState}
                            hideDropdown={() => {
                                this.setState({
                                    moreMenuIsOpen: false
                                })
                            }}
                            handleEditPurpose={() => {
                                toggleModal('textarea')
                            }}
                            handleSettings={() => {
                                toggleModal('settings')
                            }}
                            handlePrivacySettings={() => {
                                toggleModal('settings')
                            }}
                            handleDelete={() => {
                                toggleModal('confirm')
                            }}
                        />
                    }
        		</div>	            	
            </div>
		);
	}
}