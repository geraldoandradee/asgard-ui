
import Bridge from "../../helpers/Bridge";
import React from "react/addons";
import config from "../../../config/config";
import MarathonService from "../../plugin/sdk/services/MarathonService";
import DialogActions from "../../actions/DialogActions";

const APPEND = 1;
const BLOCK_SIZE = 1024;

class LogReader {
  constructor(task, logfile, onNewlogDataCallback, direction = APPEND) {
    this.offset = 0;
    this.logData = [];
    this.task = task;
    this.logfile = logfile;
    this.onNewlogDataCallback = onNewlogDataCallback;
    this.direction = direction;
    this.poll = this.poll.bind(this);
    this.handleReadOK = this.handleReadOK.bind(this);
    this.stopPoll = this.stopPoll.bind(this);
    this.startPoll = this.startPoll.bind(this);
    this.startPoll();
  }

  stopPoll() {
    clearInterval(this.intervalId);
  }

  /* eslint-disable max-len */
  startPoll() {
    const url = `tasks/${this.task.id}/files/read?path=${this.logfile}&offset=-1`;
    MarathonService.request({
      resource: url}
    ).success((response) => {
      this.offset = response.body.offset;
      this.offset -= Math.min(this.offset, 512);
      this.intervalId = setInterval(this.poll, 1000);
    }).error((data) => {
      console.log(`ERROR ${this.task.id}, ${this.logfile}. ${data}`);
    });
  }

  poll() {
    MarathonService.request({resource:`tasks/${this.task.id}/files/read?path=${this.logfile}&offset=${this.offset}&length=${BLOCK_SIZE}`})
      .success(this.handleReadOK)
      .error((data) => {
        console.log(`ERROR task ${this.task.id}, ${this.logfile}. ${data}`);
      });
  }
  /* eslint-enable */

  handleReadOK(response) {
    const {data} = response.body;
    if (data) {
      this.offset += data.length;
      this.logData.push(data);
      this.onNewlogDataCallback(this.logData);
    }
  }

};

export default React.createClass({

  displayName: "TaskLogComponent",

  propTypes: {
    logfile: React.PropTypes.string,
    task: React.PropTypes.object
  },

  getInitialState() {
    return {
      logdata: []
    };
  },

  componentDidMount() {
    const {task, logfile} = this.props;
    this.reader = new LogReader(task, logfile, this.onNewlogData);
  },

  onNewlogData(logdata) {
    this.setState({
      logdata: logdata
    });
  },

  componentWillUnmount() {
    this.reader.stopPoll();
  },

  handleDownload() {
    const {task, logfile} = this.props;
    const url = `tasks/${task.id}/files/download?path=${logfile}`;
    MarathonService.request({resource: url}
    ).success((response) => {
      Bridge.navigateTo(`${config.apiURL}${response.body.download_url}`);
    }).error((data) => {
      console.log(`ERROR ${task.id}, ${logfile}. ${data}`);
      DialogActions.alert({message: "Falha ao baixar log: ${data.body}"});
    });
  },

  getLogLines() {
    if (this.reader) {
      return this.reader.logData;
    }
    return [];
  },

  render() {
    return (
      <div className="tab-pane">
        <div className="row col-sm-6">
          <button
              className="btn btn-sm btn-default"
              onClick={this.handleDownload}>
            Download
          </button>
        </div>
        <div className="log-view">
            {this.state.logdata}
        </div>
      </div>
    );
  }
});
