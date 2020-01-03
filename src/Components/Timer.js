import React, { useEffect, useState, useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Circle, Text } from "react-konva";

const Timer = () => {

    let countdown;

    const progressBar = useRef();
    const planet = useRef();

    const [stageWidth, setStageWidth] = useState(window.innerWidth);
    const [stageHeight, setStageHeight] = useState(window.innerHeight);

    const [engaged, setEngaged] = useState(false);
    const [paused, setPaused] = useState(false);

    const sessionOrder = [`mix`, `break`, `reference`];
    const [sessionOrderCount, setSessionOrderCount] = useState(0);

    const [currentSession, setCurrentSession] = useState('mix');

    const [mixSessionLength, setMixSessionLength] = useState(360);
    const [breakSessionLength, setBreakSessionLength] = useState(60);
    const [cleanseSessionLength, setCleanseSessionLength] = useState(60);

    const [sessionRemainder, setSessionRemainder] = useState();

    const [progress, setProgress] = useState();
    const [remianingTime, setRemainingTime] = useState();

    const stageRef = useRef();

    const updateWidthAndHeight = () => {

        setStageWidth(window.innerWidth);
        setStageHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize', updateWidthAndHeight)

        return () => {
            window.removeEventListener('resize', updateWidthAndHeight);
        }
    });

    useEffect(() => {

        setCurrentSession(sessionOrder[sessionOrderCount])

        if(engaged){

            if(currentSession === 'mix'){
                timer(mixSessionLength);
            } else if(currentSession === 'break'){
                timer(breakSessionLength);
            } else {
                timer(cleanseSessionLength);
            }

            if(sessionOrderCount < 2){
                setSessionOrderCount(sessionOrderCount + 1);
            } else {
                setSessionOrderCount(0);
            }

            console.log('on')
        } else {
            console.log('off')
        }
    }, [engaged]);

    useEffect(() => {

        if(!engaged){
            return;
        }

        let animation = new Konva.Animation(frame => {
            progressBar.current.attrs.width = ((timeBarWidth * progress)/100);

            planet.current.rotation((progress/100)*360);

        }, progressBar.current.getLayer());
      
        animation.start();

        return () => {
            animation.stop();
        };

    }, [progress])

    const widthPercentage = (width) => {   
        return Math.floor(stageWidth / (100 / width))
    };

    const heightPercentage = (height) => {   
        return Math.floor(stageHeight / (100 / height))
    };

    const handleEngageClick = () => {
        setEngaged(!engaged)
    };

    const timeBarWidth = widthPercentage(60);

    const timer = (seconds) => {

        const now = Date.now();
        const then = now + (seconds * 1000);


        displayTimeLeft(seconds, seconds);

        countdown = setInterval(() => {

            const secondsLeft = Math.round((then - Date.now())/1000);

            if(secondsLeft < 0){
                clearInterval(countdown);
                setProgress(0);
                setEngaged(!engaged);
                return;
            }

            displayTimeLeft(secondsLeft, seconds);
        }, 1000)
    };

    const displayTimeLeft = (secs, length) => {

        const minutes = Math.floor(secs / 60);
        const remainderSeconds = secs % 60;

        setSessionRemainder(secs);

        setRemainingTime(`${minutes}:${remainderSeconds}`)
        setProgress(100 - ((secs/length) * 100));
    };


    return (
        <div>
            <Stage ref={stageRef} width={stageWidth} height={stageHeight}>
                <Layer>
                    <Rect width={stageWidth} height={stageHeight} fill='black'/>
                    <Circle ref={planet} x={widthPercentage(50)} y={heightPercentage(105)} radius={widthPercentage(40)} shadowColor="blue" shadowBlur={widthPercentage(20)} fillLinearGradientStartPoint={{ x: -50, y: -50 }} fillLinearGradientEndPoint={{ x: 50, y: 50 }} fillLinearGradientColorStops={[0, 'purple', 1, 'pink']}/>
                    <Rect x={widthPercentage(40)} y={heightPercentage(25)} width={widthPercentage(20)} height={heightPercentage(10)} fill={'red'} onClick={handleEngageClick}/>
                    <Rect x={widthPercentage(20)} y={heightPercentage(45)} width={timeBarWidth} height={heightPercentage(10)} fill={'blue'}/>
                    <Rect ref={progressBar} x={widthPercentage(20)} y={heightPercentage(45)} width={0} height={heightPercentage(10)} fill={'red'}/>
                    <Text text={`${currentSession}`} fill={'white'} x={widthPercentage(47)} y={heightPercentage(40)} fontSize={widthPercentage(2)} opacity={engaged ? 1 : 0}/>
                    <Text text={`${remianingTime}`} fill={'white'} x={widthPercentage(47)} y={heightPercentage(65)} fontSize={widthPercentage(2)} opacity={engaged ? 1 : 0}/>
                    <Text text={engaged ? `pause`: `start`} fill={'white'} x={widthPercentage(42)} y={heightPercentage(25)} fontSize={widthPercentage(2)}/>
                </Layer>
            </Stage>
        </div>
    )
};

export default Timer;
