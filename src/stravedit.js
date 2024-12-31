import React, { Component } from "react";
import axios from "axios";

class StravaActivitiesEditor extends Component {
  state = {
    activities: [],
    loading: false,
    error: null,
    editingActivity: null,
    newName: "",
  };

  // Replace with your Strava API access token
  accessToken = "1531952251b6ac1681ccba23b7fc1b2b59d9692a";

  componentDidMount() {
    this.fetchActivities();
  }

  fetchActivities = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await axios.get(
        "https://www.strava.com/api/v3/athlete/activities",
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      this.setState({ activities: response.data });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  startEditing = (activity) => {
    this.setState({ editingActivity: activity.id, newName: activity.name });
  };

  cancelEditing = () => {
    this.setState({ editingActivity: null, newName: "" });
  };

  handleNameChange = (e) => {
    this.setState({ newName: e.target.value });
  };

  saveEdit = async (activityId) => {
    const { newName } = this.state;
    try {
      await axios.put(
        `https://www.strava.com/api/v3/activities/${activityId}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      this.setState({ editingActivity: null, newName: "" });
      this.fetchActivities(); // Refresh the activities list
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { activities, loading, error, editingActivity, newName } = this.state;

    if (loading) return <p>Loading activities...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h1>Edit Strava Activities</h1>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {editingActivity === activity.id ? (
                <div>
                  <input
                    type="text"
                    value={newName}
                    onChange={this.handleNameChange}
                  />
                  <button onClick={() => this.saveEdit(activity.id)}>Save</button>
                  <button onClick={this.cancelEditing}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{activity.name}</strong> - {activity.distance / 1000} km
                  <button onClick={() => this.startEditing(activity)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StravaActivitiesEditor;
