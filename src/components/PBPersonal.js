import React from 'react';

const PBPersonal = ({ numberOfTasks, tasksDone }) => {
    
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