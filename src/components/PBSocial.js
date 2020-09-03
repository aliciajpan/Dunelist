import React from 'react';

const PBSocial = ({ numberOfTasks, tasksDone }) => {
    
    const styles = {
        barStyle: {
            width: (tasksDone / numberOfTasks) * 100 + "%",
        }
    }

    return (
        <div id="myProgressCategory">
            <div style={styles.barStyle} id="myBarSocial"></div>
        </div>
    );
};


export default PBSocial;