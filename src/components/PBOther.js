import React from 'react';

const PBOther = ({ numberOfTasks, tasksDone }) => {
    
    const styles = {
        barStyle: {
            width: (tasksDone / numberOfTasks) * 100 + "%",
        }
    }

    return (
        <div id="myProgressCategory">
            <div style={styles.barStyle} id="myBarOther"></div>
        </div>
    );
};


export default PBOther;