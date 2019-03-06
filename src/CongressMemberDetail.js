import React, {useState, useEffect} from 'react';
import styles from './CongressMemberDetail.module.css';
import axios from 'axios';

const CongressMemberDetail = (props) => {
  const memberId = props.match.params.memberId;
  const [congressMember, setCongressMember] = useState({results: []});

  const fetchCongressMember = async () => {
    const fetchedCongressMember = await axios(
      `https://api.propublica.org/congress/v1/members/${memberId}`, {
        headers:
        {'X-API-Key': "API_KEY"}
      }
    );

    setCongressMember(fetchedCongressMember.data);
  }

  useEffect(() => {
    fetchCongressMember();
  }, []);

  const handlePartyName = (abbrev) => {
    if (abbrev === "R")
     return "Republican"
    else if (abbrev === "D") {
      return "Democrat"
    } else {
      return "Independent"
    }
  }
  
  return (
    <>
      {congressMember.results.map(member => 
        <ul className={styles.detailWrapper}>
          <p>
            <span role="img" aria-label="American flag">🇺🇸 </span>
            <a href={member.url}>{member.first_name} {member.last_name}</a> is a {handlePartyName(member.current_party)} who last voted on {new Date(member.most_recent_vote).toLocaleDateString()}.
          </p>
    
          <div className={styles.nestedDetailWrapper}>
            <details>
              <summary>Contact Info</summary>
              {member.roles.filter(x => x.congress === "116").map(role => 
                <ul>
                  <li>{role.title} {role.state} district {role.district}</li>
                  <li>{role.office}</li>
                  <li>{role.phone}</li>
                </ul>)}
            </details>

            <details>
              <summary>Voting Record</summary>
              {member.roles.filter(x => x.congress === "116").map(role => 
                <ul>
                  <li>Bills sponsored: {role.bills_sponsored}</li>
                  <li>Bills cosponsored: {role.bills_cosponsored}</li>
                  <li>Missed votes: {role.missed_votes_pct}%</li>
                  <li>Votes with party: {role.votes_with_party_pct}%</li>
                </ul>)}
            </details>

            <details>
              <summary>Committees</summary>
              {member.roles.filter(x => x.congress === "116").map(role => 
                <div>
                  {role.committees.map(committee => 
                    <ul>
                      <li>{committee.name}, {committee.title}</li>
                    </ul>)}
                </div>)}
            </details>

            <details>
              <summary>Subcommittees</summary>
              {member.roles.filter(x => x.congress === "116").map(role => 
                <div>
                  {role.subcommittees.map(subcommittee => 
                    <ul>
                      <li>{subcommittee.name}, {subcommittee.title}</li>
                    </ul>)}
                </div>)}
            </details>
          </div>
        </ul>
      )}
    </>
  );
}

export default CongressMemberDetail;