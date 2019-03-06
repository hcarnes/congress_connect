import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from './CongressMemberSelector.module.css';

const CongressMemberSelector = (props) => {
  const chamber = props.match.params.chamber;
  const [congressMembers, setCongressMembers] = useState({results: []});

  const fetchCongressMembers = async () => {
    const fetchedCongressMembers = await axios(
      `https://api.propublica.org/congress/v1/116/${chamber}/members.json`, {
        headers:
        {'X-API-Key': "API_KEY"}
      }
    );

    setCongressMembers(fetchedCongressMembers.data);
    console.log(fetchedCongressMembers.data)
  }

  useEffect(() => {
    fetchCongressMembers();
  }, []);
  
  return (
    <div className={styles.mainWrapper}>
      <div>
        {congressMembers.results.map(item => (
          <p key={item.chamber}> <span role="img" aria-label="American flag">🇺🇸</span> Welcome to the {item.congress}th {item.chamber} </p>
        ))}
      </div>

      <ul className={styles.memberWrapper}>
        {congressMembers.results.map(body => (body.members.map(member => 
        <li key={member.id}><Link to={`/${chamber}/${member.id}`}>{member.first_name} {member.last_name}, {member.title} from {member.state}</Link></li>)
      ))}
      </ul>
    </div>
  );
}

export default CongressMemberSelector;