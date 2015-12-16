import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import SubSetActions from '../../SetView/SetHeader/SubSetActions';

export default class ButtonGroup extends Component {
	static propTypes = {
		onSave: PropTypes.func
	}

	render() {
        const { onSave, set, editing } = this.props;
		return(
			<div className="CreateSetHeader-wrapper-buttongroup">
            	<div className="push-right">
            		<div className="Button-set">
                        {
                            editing
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
            			<SubSetActions right={true} createset={true} {...this.props} />	
            		</div>	            	
            	</div>
            </div>
		);
	}
}