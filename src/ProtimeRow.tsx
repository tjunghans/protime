import React from "react";

interface ProtimeRowProps {
  name: string;
  percent: string | number;
  totalDays: string | number;
  fullDays: string | number;
  hours: string | number;
  index: number;
  onNameChange: (index: number, value: string) => void;
  onPercentChange: (index: number, value: string) => void;
  onRemove?: (index: number) => void;
}

export class ProtimeRow extends React.Component<ProtimeRowProps> {
  render() {
    const { name, percent, totalDays, fullDays, hours } = this.props;
    return (
      <tr>
        <td>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={this.handleNameChange}
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Enter percent"
            value={percent}
            onChange={this.handlePercentChange}
          />
        </td>
        <td>
          <span>{totalDays}</span>
        </td>
        <td>
          <span>{fullDays}</span>
        </td>
        <td>
          <span>{Math.round(Number(hours) * 100) / 100}</span>
        </td>
        <td>
          <button
            type="button"
            className="pure-button button-warning"
            onClick={this.props.onRemove ? this.handleRemove : undefined}
            disabled={this.props.onRemove === undefined}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }

  private handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onNameChange(this.props.index, evt.target.value);
  };

  private handlePercentChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onPercentChange(this.props.index, evt.target.value);
  };

  private handleRemove = () => {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.index);
    }
  };
}
