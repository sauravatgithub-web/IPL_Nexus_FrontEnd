import miLogo from './miLogo.jpg';
import cskLogo from './cskLogo.jpg';
import rcbLogo from './rcbLogo.jpg';
import kkrLogo from './kkrLogo.jpg';
import dcLogo from './dcLogo.jpg';
import srhLogo from './srhLogo.jpg';
import pbksLogo from './pbksLogo.jpg';
import rrLogo from './rrLogo.png';
import lsgLogo from './lsgLogo.png';
import gtLogo from './gtLogo.jpg'; 

const teamMap = new Map();
const logoMap = new Map();
const nameMap = new Map();

teamMap.set('mumbai-indians', 'MI');
teamMap.set('chennai-super-kings', 'CSK');
teamMap.set('royal-challengers-bangalore', 'RCB');
teamMap.set('kolkata-knight-riders', 'KKR');
teamMap.set('delhi-capitals', 'DC');
teamMap.set('sunrisers-hyderabad', 'SRH');
teamMap.set('punjab-kings', 'PBKS');
teamMap.set('rajasthan-royals', 'RR');
teamMap.set('lucknow-super-giants', 'LSG');
teamMap.set('gujarat-titans', 'GT');

logoMap.set('mumbai-indians', miLogo);
logoMap.set('chennai-super-kings', cskLogo);
logoMap.set('royal-challengers-bangalore', rcbLogo);
logoMap.set('kolkata-knight-riders', kkrLogo);
logoMap.set('delhi-capitals', dcLogo);
logoMap.set('sunrisers-hyderabad', srhLogo);
teamMap.set('punjab-kings', pbksLogo);
logoMap.set('rajasthan-royals', rrLogo);
logoMap.set('lucknow-super-giants', lsgLogo);
logoMap.set('gujarat-titans', gtLogo);

nameMap.set('mumbai-indians', 'Mumbai Indians');
nameMap.set('chennai-super-kings', 'Chennai Super Kings');
nameMap.set('royal-challengers-bangalore', 'Royal Challengers Bangalore');
nameMap.set('kolkata-knight-riders', 'Kolkata Knight Riders');
nameMap.set('delhi-capitals', 'Delhi Capitals');
nameMap.set('sunrisers-hyderabad', 'Sunrisers Hyderabad');
nameMap.set('punjab-kings', 'Punjab Kings');
nameMap.set('rajasthan-royals', 'Rajasthan Royals');
nameMap.set('lucknow-super-giants', 'Lucknow Super Giants');
nameMap.set('gujarat-titans', 'Gujarat Titans');

export default {teamMap, logoMap, nameMap};
