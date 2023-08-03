import Button from "components/Button/Button";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Countdown = () => {
    const ref: any = useRef();
    const [countdown, setCountdown] = useState<number>(10);
    const [start, setStart] = useState<boolean>(true);
    useEffect(() => {
        ref.current =
            start &&
            setInterval(() => {
                setCountdown((pre) => pre - 1);
            }, 1000);
        return () => clearInterval(ref.current);
    }, [start]);

    useEffect(() => {
        if (countdown === 0) {
            setCountdown(0);
            clearInterval(ref.current);
        }
    }, [countdown]);

    const handleStop = useCallback(() => {
        setStart(false);
        clearInterval(ref.current);
    },[]);
    const handleContinue = useCallback(() => {
        countdown === 0 ? setStart(false) : setStart(true);
    },[]);
    const handleSetTimer = useCallback(() => {
        setCountdown(10)
        setStart(false);
    },[])
    return (
        <div className="container">
            Countdown: {countdown}
            <br />
            <Button className="btn-prev position-relative" onClick={handleSetTimer} primary>
                Set Timer
            </Button>
            <Button className="btn-prev position-relative" onClick={handleContinue} secondary>
                {countdown === 0 ? "Start" : "Continue"}
            </Button>
            <Button className="btn-prev position-relative" onClick={handleStop} danger>
                Stop
            </Button>
        </div>
    );
};

export default Countdown;
