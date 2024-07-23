import { useEffect } from 'react';
import { magnetometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.magnetometer, 1000);

const useHeadingTracking = (setHeading) => {
    useEffect(() => {
        const subscription = magnetometer.subscribe(({ x, y, z }) => {
            let angle = 0;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
            setHeading(angle);
        });

        return () => subscription.unsubscribe();
    }, [setHeading]);
};

export default useHeadingTracking;
