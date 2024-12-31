
import React, { useEffect, useState } from "react";
import axios from "axios";

const StravaActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with your Strava access token
  const accessToken = "1531952251b6ac1681ccba23b7fc1b2b59d9692a";

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://www.strava.com/api/v3/athlete/activities", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setActivities(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [accessToken]);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>Error fetching activities: {error}</p>;

  return (
    <div>
      <h1>Strava Activities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StravaActivities;
