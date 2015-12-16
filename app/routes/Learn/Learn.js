import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';

import moment from 'moment';
import * as learnactions from '../../actions/learnv2';
import * as setactions from '../../actions/usersets';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('./Learn.scss');

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

/* Components */
import LearnCard from '../../components/Learn/LearnCard/LearnCard';
import ShowCorrect from '../../components/Learn/ShowCorrect/ShowCorrect';
import LearnInput from '../../components/Learn/LearnInput/LearnInput';
import LearnFeedback from '../../components/Learn/LearnFeedback/LearnFeedback';
import LearnHelp from '../../components/Learn/LearnHelp/LearnHelp';
import DiffControls from '../../components/Learn/DiffControls/DiffControls';
import Hint from '../../components/Learn/Hint/Hint';
import SeqControl from '../../components/Learn/LearnSeqControl/SeqControl';
import RoundSummary from '../../components/Learn/RoundSummary/RoundSummary';
import SequenceSummary from '../../components/Learn/SequenceSummary/SequenceSummary';

@connect(state => ({
	slot_index: state.learn.slot_index,
	rounds: state.learn.rounds,
	current_round: state.learn.current_round,
	round_index: state.learn.current_round_index,
	isShowingCompletedRound: state.learn.isShowingCompletedRound,
	isUpdatingState: state.learn.isUpdatingState,

	showHint: state.learn.isShowingHint,
	isGrading: state.learn.isGrading,
	isFetchingTrials: state.learn.isFetchingTrials,
	showLearn: state.learn.isFetchingLearn,
	showCorrect: state.learn.isShowingCorrect,
	showCompletedSequence: state.learn.isShowingCompletedSequence,
	showFeedback: state.learn.isShowingFeedback,
	slots: state.learn.slots,
	current_sequence: state.learn.current_sequence,
	current_slot: state.learn.current_slot,
	current_trial: state.learn.current_trial,
	feedback: state.learn.feedback,
	user_answer: state.learn.user_answer,
	sets: state.sets.set_items
	}),
	dispatch => ({
		...bindActionCreators({
			...learnactions,
			...setactions
		}, dispatch)
	})
)
export default class Learn extends Component {
	static propTypes = {
		params: PropTypes.object
	}

	state = {
		flag: false,
		start: null,
		inputvalue: ''
	}

	componentWillMount() {
		const {fetchLearn, params } = this.props;
		fetchLearn(1, Number(params.id))
	}	

	componentDidMount() {
		$(window).on('keyup', ::this.handleKeyUp)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.current_slot !== undefined) {
			if(this.props.current_slot.id !== nextProps.current_slot.id) {
				this.setState({
					inputvalue: ''
				});
			}
		}
	}

	componentWillUnmount() {
		$(window).off('keyup')
		const { clearLearn } = this.props;
		clearLearn()
	}

	keyDownHandlers = {
		37(event) {
			this.props.nextSlot('prev')
			return true;
		}, 

		39(event) {
			this.props.nextSlot('next')
			return true;
		},

		40(event) {
			if(!this.props.current_slot.completed) {
				this.refs.learn_card.sendEvent(event)
				return true;
			}
		},
		13(event) {
			const { current_slot, current_trial, isGrading, skipSlot } = this.props;
			var now, start, diff, difftwo;
			if(current_slot.format == 'copy' && this.state.inputvalue.length === 0 && !this.props.isShowingCompletedRound) {
				now = new Date()
				now = (now).toISOString().replace("T", " ").replace("Z", "")
				start = (current_trial.start)
				diff = (moment(now).diff(start))
				if(diff > 1500) {
					skipSlot()
				}
				return;
			}			
			if(!current_slot.completed) {
				this.refs.learn_card.sendEvent(event)
				return true;
			}
			if(!isGrading && current_slot.completed && !this.props.isShowingCompletedRound) {
				skipSlot()
				return true;
			}
		}
	}

	handleArrowKeys(event) {
		if (this.keyDownHandlers[event.which]) {
    		return this.keyDownHandlers[event.which].call(this, event);
  		}
	}

	
	handleKeyUp(event) {
		const { showCorrect, 
			 	showCompletedSequence, 
			 	isGrading,
			 	isShowingCompletedRound,
			 	newSequence,
			 	nextRound,
			 	skipSlot } = this.props;
		if(event.which && isShowingCompletedRound) {
			nextRound()
			return;
		}
		if(event.which && showCompletedSequence) {
			newSequence(null)
			return;
		}
		if(event.which && showCorrect) {
			if(!this.handleArrowKeys(event)) {
				skipSlot()
				return;
			}
			return;
		}
		this.handleArrowKeys(event)
	}

	updateStateWithUserResponse(value) {
		this.setState({
			inputvalue: value
		});
	}

	handleUserResponse(response) {
		const { updateTrial } = this.props;
		updateTrial(response)
 	}

 	handleHint(event) {
 		const hint = {type: "hint"} 
 		this.refs.learn_card.sendEvent(event, hint)
 	}

	render() {
		const { current_slot,
				current_trial,
				current_sequence,
				slots,
				newSequence, 
				isFetchingTrials,
				showLearn,
				showCompletedSequence, 
				isShowingCompletedRound,
				showCorrect, 
				showFeedback,
				showHint,
				skipSlot, 
				nextSlot,
				params} = this.props;
		
		return (
			<DocumentTitle title={!showLearn && current_sequence.set.title !== undefined 
							? `Learn: ${current_sequence.set.title}` 
							: "Loading Learn..."}>

				<div className="learn_page"
					 ref="learn_page"
					 id="learn_page">
					 <div className="learn_wrapper">
					
					{
						showLearn
						? <div className="spinner_container">	
				 	  	  		<LoadingSpinner />
				 	  	  		<div className="message">
						 	    	<span className="">Loading</span>
						 	    	<span className="loading"><span>.</span><span>.</span><span>.</span></span>
					 	    	</div>
				 	      </div>
				 	    : null
					}
					 {
						!showLearn && slots !== undefined
						? <div>
							<SeqControl {...this.props}/>
								<div className={classnames("learn_container", 
											   {'no_border': isShowingCompletedRound || showCompletedSequence },
											   {"round_summary": isShowingCompletedRound})}>
									<div>
										{
											current_slot !== undefined 
											&& current_trial !== undefined 
											&& !isShowingCompletedRound
											&& !showCompletedSequence
											&& <LearnCard 
												   updateValue={(value) => ::this.updateStateWithUserResponse(value)}
												   submitAnswer={(response) => ::this.handleUserResponse(response)}
												   getHint={(response) => ::this.props.hint(response)}
												   ref="learn_card"
												   slot={current_slot !== undefined ? current_slot : null} 
												   cue={current_slot.item !== undefined ? current_slot.item.cue : null}
												   {...this.props}/>
										}
										{
											showCorrect && !isShowingCompletedRound && !showCompletedSequence
											&& <ShowCorrect correctMiniSequence={isShowingCompletedRound} 
														   {...this.props}/>
										}
										{
											isShowingCompletedRound && !showCompletedSequence
											&& 
											<RoundSummary {...this.props}/>
										}
										{
											showCompletedSequence && !isShowingCompletedRound
											&&<SequenceSummary {...this.props}/>
										}
										{
											!showCompletedSequence && isShowingCompletedRound 
											&& <a style={{marginLeft: '0px'}} className="link continue_link" 
											     onClick={() => this.props.nextRound()}>
											     Press any key to continue to next round</a>
										}												
										{
											!showCorrect 
											&& !showCompletedSequence && !isShowingCompletedRound 
											&& false // temp value
											? <DiffControls getHint={::this.handleHint} {...this.props} />
											: null
										}
										{
											(!showCorrect 
											&& !showCompletedSequence || !isShowingCompletedRound) 
											&& (showHint && current_trial.augs !== null) 
											? <Hint hints={current_trial.augs.length > 0 ? current_trial.augs : null} 
													{...this.props}/>
											: null
										}
										
										

									</div>
								 </div> 
							 </div>
						: null
					}
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

/*

<div style={{
	position: 'absolute'
}} className="feedback">
	<a className="feedback_link">Feedback</a>
</div>
<div className="debug_feedback">
	<div className="debug_cell">
		<p>Previous</p>
		{
			debug_prev_trial.map((x, i) => {
				return <p className="feedback_key" key={i}>{x}</p>
			})
		}
	</div>
	<div className="debug_cell">
		<p>Current</p>
		{
			debug_curr_trial.map((x, i) => {
				return <p className="feedback_key" key={i}>{x}</p>
			})
		}
	</div>
</div>
*/

										


