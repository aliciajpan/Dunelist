import React from 'react';

const PBHealth = ({ numberOfTasks, tasksDone }) => {
    
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