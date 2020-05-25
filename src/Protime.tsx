import React from "react";
import "./Protime.scss";
import { ProtimeRow } from "./ProtimeRow";

export interface ProjectTime {
  name: string;
  percent: string;
}

export interface ProtimeState {
  days: string;
  hoursPerDay: string;
  projectTimes: ProjectTime[];
}

const defaultState: ProtimeState = {
  days: "20",
  hoursPerDay: "8.4",
  projectTimes: [{ name: "", percent: "100" }],
};

export class Protime extends React.Component<{}, ProtimeState> {
  constructor(props: any) {
    super(props);
    const ls = localStorage.getItem("protime");
    if (ls) {
      this.state = {
        ...defaultState,
        ...JSON.parse(ls),
      };
    } else {
      this.state = {
        ...defaultState,
      };
    }
  }

  componentDidUpdate() {
    localStorage.setItem("protime", JSON.stringify(this.state));
  }

  render() {
    const calculatedProjectTimes = this.state.projectTimes.map(
      ({ name, percent }) => {
        const totalDays = (Number(this.state.days) * Number(percent)) / 100;
        const fullDays = Math.floor(totalDays);
        const hours = (totalDays - fullDays) * Number(this.state.hoursPerDay);

        return {
          name,
          percent,
          totalDays,
          fullDays,
          hours,
        };
      }
    );

    const totalPercent = calculatedProjectTimes.reduce(
      (totalPercent, { percent }) => {
        return totalPercent + Number(percent);
      },
      0
    );

    const totalTotalDays = calculatedProjectTimes.reduce(
      (totalTotalDays, { totalDays }) => {
        return totalTotalDays + Number(totalDays);
      },
      0
    );

    const totalFullDays = calculatedProjectTimes.reduce(
      (totalFullDays, { fullDays }) => {
        return totalFullDays + Number(fullDays);
      },
      0
    );

    const totalHours =
      Math.round(
        calculatedProjectTimes.reduce((totalHours, { hours }) => {
          return totalHours + Number(hours);
        }, 0) * 100
      ) / 100;

    return (
      <div className="Protime">
        <form className="pure-form">
          <fieldset>
            <div className="pure-g config">
              <input
                type="number"
                name="days"
                placeholder="Days"
                onChange={this.handleDaysChange}
                value={this.state.days}
              />

              <input
                type="number"
                name="hoursPerDay"
                placeholder="Hours per day"
                onChange={this.handleHoursPerDayChange}
                value={this.state.hoursPerDay}
              />

              <button
                type="button"
                className="pure-button pure-button-primary"
                onClick={this.handleAddProjectClick}
              >
                Add Project
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Booking Percentage</th>
                  <th>Total Days</th>
                  <th>Full Days</th>
                  <th>Hours</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {calculatedProjectTimes.map(
                  ({ name, percent, totalDays, fullDays, hours }, idx) => (
                    <ProtimeRow
                      index={idx}
                      key={idx}
                      name={name}
                      percent={percent}
                      totalDays={totalDays}
                      fullDays={fullDays}
                      hours={hours}
                      onNameChange={this.handleNameChange}
                      onPercentChange={this.handlePercentChange}
                      onRemove={
                        this.state.projectTimes.length > 1
                          ? this.handleRemove
                          : undefined
                      }
                    />
                  )
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td>Totals</td>
                  <td>
                    <div className={totalPercent !== 100 ? "invalid" : ""}>
                      {totalPercent}
                    </div>
                  </td>
                  <td>
                    <div>{totalTotalDays}</div>
                  </td>
                  <td>
                    <div>{totalFullDays}</div>
                  </td>
                  <td>
                    <div>{totalHours}</div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </fieldset>
        </form>
      </div>
    );
  }

  private handleDaysChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      days: evt?.target?.value,
    });
  };

  private handleHoursPerDayChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      hoursPerDay: evt?.target?.value,
    });
  };

  private handleNameChange = (index: number, name: string) => {
    this.setState({
      projectTimes: this.state.projectTimes.map((item, idx) => {
        if (idx === index) {
          return { ...item, name };
        }
        return item;
      }),
    });
  };

  private handlePercentChange = (index: number, percent: string) => {
    this.setState({
      projectTimes: this.state.projectTimes.map((item, idx) => {
        if (idx === index) {
          return { ...item, percent };
        }
        return item;
      }),
    });
  };

  private handleRemove = (index: number) => {
    this.setState({
      projectTimes: this.state.projectTimes.filter((_, idx) => idx !== index),
    });
  };

  private handleAddProjectClick = () => {
    const percent = this.state.projectTimes.reduce((delta, { percent }) => {
      return delta - Number(percent);
    }, 100);
    this.setState({
      projectTimes: this.state.projectTimes.concat({
        name: "",
        percent: percent.toString(),
      }),
    });
  };
}
