import React, { NextResponse } from 'next/server';

function ScoreDisplay() {
    // const [score, setScore] = useState(0);
    const score = 30;
    //
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetch('./score.js')
    //             .then(response => response.json())
    //             .then(data => setScore(data.score))
    //             .catch(error => console.error('Error fetching score:', error));
    //     }, 1000);  // 매 초마다 점수 업데이트

    //     return () => clearInterval(interval);  // 컴포넌트 언마운트 시 인터벌 정리
    // }, []);

    // return <div>Score: {score}</div>;

    return(
        <div>
            <h1>Score: {score}</h1>
        </div>
    );
};

export default ScoreDisplay;