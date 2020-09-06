import React from 'react';

const PBPersonal = ({ numberOfTasks, tasksDone }) => {
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
            <div style={styles.barStyle} id="myBarPersonal"></div>
        </div>
    );
};


export default PBPersonal;