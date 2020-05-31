import React from "react";
import "./Protime.scss";
import { ProtimeRow } from "./ProtimeRow";
import { round } from "./utils";

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

    const totalTotalDays = round(
      calculatedProjectTimes.reduce((totalTotalDays, { totalDays }) => {
        return totalTotalDays + Number(totalDays);
      }, 0),
      2
    );

    const totalFullDays = calculatedProjectTimes.reduce(
      (totalFullDays, { fullDays }) => {
        return totalFullDays + Number(fullDays);
      },
      0
    );

    const totalHours = round(
      calculatedProjectTimes.reduce((totalHours, { hours }) => {
        return totalHours + Number(hours);
      }, 0),
      2
    );

    const hoursToDaysBooking = getHoursToDaysBooking(
      calculatedProjectTimes.map(({ hours }) => hours)
    );

    const hoursToDaysBookingInstructions: {
      name: string;
      hours: number;
    }[][] = [];
    hoursToDaysBooking
      .filter((day) => !(day.length === 1 && day[0] === 0))
      .forEach((day, dayCount) => {
        hoursToDaysBookingInstructions.push([]);

        day.forEach((projectHours, hourCount) => {
          hoursToDaysBookingInstructions[dayCount].push({
            name: calculatedProjectTimes[dayCount + hourCount].name,
            hours: projectHours,
          });
        });
      });

    return (
      <div className="Protime">
        <form>
          <fieldset>
            <div className="flex five-600 config">
              <div>
                <label>
                  <input
                    type="number"
                    name="days"
                    placeholder="Days worked"
                    onChange={this.handleDaysChange}
                    value={this.state.days}
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    name="hoursPerDay"
                    placeholder="Hours per day"
                    onChange={this.handleHoursPerDayChange}
                    value={this.state.hoursPerDay}
                  />
                </label>
              </div>
              <div>
                <button type="button" onClick={this.handleAddProjectClick}>
                  Add Project
                </button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Booking %</th>
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
            {hoursToDaysBookingInstructions.length > 0 ? (
              <div>
                <h3>Hours Booking Instructions</h3>
                {hoursToDaysBookingInstructions.map((day, idx) => (
                  <div>
                    <div>Day: {idx + 1}</div>
                    <div>
                      {day.map(({ name, hours }) => (
                        <div>
                        {name} : {hours}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
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

function getHoursToDaysBooking(
  hours: number[],
  hoursInDay: number = 8.4
): number[][] {
  function sum(nums: number[]) {
    return nums.reduce((sum, a) => {
      return sum + a;
    }, 0);
  }

  const book: number[][] = [];
  hours
    .map((hours) => round(hours, 2))
    .forEach((hours, index) => {
      if (book.length === 0) {
        book[0] = [hours];
        return;
      }

      const latestBook = book[book.length - 1];
      const day = sum(latestBook);

      if (day === hoursInDay) {
        book.push([hours]);
      }
      if (day < hoursInDay) {
        if (day + hours <= hoursInDay) {
          latestBook.push(hours);
          return;
        }
        latestBook.push(round(hoursInDay - day, 2));
        book.push([round(day + hours - hoursInDay, 2)]);
      }
    }, []);

  return book;
}
