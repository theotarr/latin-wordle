import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import React from 'react'

type Props = {
  value?: string
  status?: CharStatus,
  cellIndex?: number
}

type State = {
  revealPhase: number
}

export class Cell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {revealPhase: (!!props.status ? 1 : -1)}
  }

  render() {
      const cellIndexClass = (!!this.props.cellIndex ? `cell-${this.props.cellIndex}` : "cell-noindex")
      const classes = classnames(
        'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
        cellIndexClass,
        {
          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
            (!this.props.status || this.state.revealPhase === 1),
          'border-black text-black dark:text-white': this.props.value && (!this.props.status || this.state.revealPhase === 1),
          'bg-slate-400 text-white border-slate-400': (this.props.status === 'absent' && this.state.revealPhase === 2),
          'bg-green-500 text-white border-green-500': (this.props.status === 'correct' && this.state.revealPhase === 2),
          'bg-yellow-500 text-white border-yellow-500': (this.props.status === 'present' && this.state.revealPhase === 2),
          'cell-animation': !!this.props.value,
          'revealing-status1': this.state.revealPhase === 1,
          'revealing-status2': this.state.revealPhase === 2,
        }
      )

      return <div
        className={classes}
        onAnimationEnd={() => {
          if(this.state.revealPhase === 1) {
            this.setState({revealPhase: 2})
          }
        }}>
          {this.props.value}
      </div>
  }
}
