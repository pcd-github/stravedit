import logo from './logo.svg';
import './App.css';
import StravaActivitiesEditor from './stravedit.js';

function App() {
  return (
    <Stack spacing={5}>
    <AppBar> Strava Activity Editor</AppBar>
    <Stack direction='row'>
      <StravaActivitiesEditor />
    </Stack>
  </Stack>
);
}

export default App;
