import React from 'react';

const PBHealth = ({ numberOfTasks, tasksDone }) => {
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
        <div id="myProgressCategory">
            <div style={styles.barStyle} id="myBarHealth"></div>
        </div>
    );
};


export default PBHealth;