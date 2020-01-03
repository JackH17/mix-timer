import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [goalOne, setGoalOne] = useState('');
    const [goalTwo, setGoalTwo] = useState('');
    const [goalThree, setGoalThree] = useState('');

    const handleGoalOneChange = (e) => {
        setGoalOne(e.target.value);
    };

    const handleGoalTwoChange = (e) => {
        setGoalTwo(e.target.value);
    };

    const handleGoalThreeChange = (e) => {
        setGoalThree(e.target.value);
    };




    return (
        <div>
            <h1>Welcome to Hawkins Mix-Timer</h1>

            <form>
                <input type='text' placeholder={'Enter your first session goal'} value={goalOne} onChange={handleGoalOneChange}/>

                <input type='text' placeholder={'Enter your second session goal'} value={goalTwo} onChange={handleGoalTwoChange}/>

                <input type='text' placeholder={'Enter your third session goal'} value={goalThree} onChange={handleGoalThreeChange}/>
            </form>


            
        </div>
    )
};

export default Home;
