import React from 'react';

const ProgressBar = ({ numberOfTasks, tasksDone }) => {
    if (numberOfTasks == 0)
    {
        numberOfTasks = 1;
    }
    const styles = {
        barStyle: {
            width: (tasksDone / numberOfTasks) * 100 + "%",
        }
    }

    return (
        <div id="myProgress">
            <div style={styles.barStyle} id="myBar"></div>
        </div>
    );
};


export default ProgressBar;