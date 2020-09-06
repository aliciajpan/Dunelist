/*curly brackets = exit HTML mode; is code now*/

import React, { useState, useEffect } from 'react'
import Task from './components/Task'
import ProgressBar from './components/ProgressBar'
import PBSchool from './components/PBSchool'
import PBHealth from './components/PBHealth'
import PBSocial from './components/PBSocial'
import PBPersonal from './components/PBPersonal'
import PBOther from './components/PBOther'
import Dropdown from './components/Dropdown'
import taskService from './services/tasks'
import categoryService from './services/category'

const App = () => {
	const [tasks, setTasks] = useState([]) /*[varName, funcName] <- list of tasks*/
	const [newTask, setNewTask] = useState('')
	const [newCategory, setNewCategory] = useState('')
	/*const [currentCategories, setCurrentCategories] = useState(["School", "Health", "Social", "Personal", "Other"])*/
    const categories = ["School", "Health", "Social", "Personal", "Other"]

	useEffect(() => {
		console.log('effect')
		taskService.getAll().then((initialTasks) => { /*taskService is mongo mans*/
			setTasks(initialTasks)
		})
	}, [])
/*
	useEffect(() => { //only runs once when start (not re-rendered)
		console.log('categories')
		categoryService.getAll().then((categories) => { //source of categories :o
			setCurrentCategories([])
			console.log(categories)
		})
	}, [])
*/ 
	const addTask = (event) => {

		event.preventDefault()
		const oneCategory = (!newCategory.replace(/\s/g, '').length === true) || (newCategory == "0") ? "Other" : newCategory  //replace whitespace with nothing, check len; true if whitespace

		const taskObject = {
			content: newTask,
			id: Math.random(10000000),
			status: false,
			category: oneCategory,
			date: Date(),
		}
/*
		const existingCategories = currentCategories.find((result) => result.category === newCategory)
		console.log(existingCategories)

		if (existingCategories === undefined && oneCategory !== 'uncategorized') {
			categoryService.create({ category: oneCategory }).then((returnedCategory) => {
				console.log(returnedCategory)
				setCurrentCategories(currentCategories.concat(returnedCategory))
			})
		}*/

		if (!newTask.replace(/\s/g, '').length) {
			alert('Please enter valid text.')
			setNewTask('')
		} else {
			taskService.create(taskObject).then((returnedTask) => {
				setTasks(tasks.concat(returnedTask))
				setNewTask('')
				setNewCategory('')

			})
		}
	}

	const handleTaskChange = (event) => {
		console.log(event.target.value)
		setNewTask(event.target.value)
	}

	const handleCategoryChange = (event) => {
        console.log(event.target.value)
		setNewCategory(event.target.value)
	}

	const toggleFinished = (id) => {
		const task = tasks.find((n) => n.id === id)

		const changedTask = { ...task, status: !task.status }

		taskService.update(id, changedTask).then((returnedTask) => {
			setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)))
		})
	}

	const deleteTask = (id) => {
		if (window.confirm('Are you sure you want to delete this?')) {
			taskService.deleteTask(id)
			setTasks(tasks.filter((task) => task.id !== id))
		}
	}

	var date = new Date();
	var displayDate = date.toDateString();
    var tasksDone = 0;
    
    var taskDict = {}; /*big dictionary*/
    
    categories.map((item) => { /*dis is string*/
        taskDict[item] = { /*big dictionary holds key = category and val = smol dictionary with numbers*/
            totalTasks: 0, 
            tasksDone: 0
        }
    })
    
    tasks.map((item) => { /*map = do same thing to each item in list*/

        if (item.status)
        {
            tasksDone += 1;
                
            taskDict[item.category].tasksDone += 1;
            
        }
        console.log(tasksDone);
        
        taskDict[item.category].totalTasks += 1;
	})
	
	var taskColours = {
		"School": "palevioletred",
		"Health": "skyblue",
		"Social": "darkorange",
		"Personal": "palegreen",
		"Other": "lightgrey"
	};

	return (
		<div>
			<h2>Task List for {displayDate}</h2>
			<div>
				{tasks.map((task, i) => (
					<Task
						key={i}
						task={task}
						toggleFinished={() => toggleFinished(task.id)}
						deleteTask={() => deleteTask(task.id)}
						dotColour = {taskColours[task.category]}
					/>
				))}
			</div>
			<form onSubmit={addTask}>
				<input value={newTask} onChange={handleTaskChange} placeholder=' Task' />
                    
                  <select
					value = {newCategory}
                    onChange = {handleCategoryChange}
                    placeholder = ' Category'>

                    <option value="0">Select category</option>

                    <option value="School">School</option>
                    <option value="Health">Health</option>
                    <option value="Social">Social</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                  </select>
	
				<input type="submit" value="Add" />


			</form>

            <div className="middle">
                
                <p>Categories</p>
                <div/>
                <p2>School</p2>
                <p3>Health</p3>
                <p5>Social</p5>
                <p4>Personal</p4>
                <p6>Other</p6>
                
            </div>

			<div className="right-side">
                
                <p>Overall</p>
                
                
                <ProgressBar numberOfTasks={tasks.length} tasksDone={tasksDone} />
                   
                <p1>School</p1>
                
                
                <PBSchool numberOfTasks={taskDict["School"]["totalTasks"]} tasksDone={taskDict["School"]["tasksDone"]} /> 
                    
                <p1>Health</p1>
                
                
                <PBHealth numberOfTasks={taskDict["Health"]["totalTasks"]} tasksDone={taskDict["Health"]["tasksDone"]} />
                    
                <p1>Social</p1>
                
                
                <PBSocial numberOfTasks={taskDict["Social"]["totalTasks"]} tasksDone={taskDict["Social"]["tasksDone"]} />
                    
                <p1>Personal</p1>
                
                
                <PBPersonal numberOfTasks={taskDict["Personal"]["totalTasks"]} tasksDone={taskDict["Personal"]["tasksDone"]} />
                    
                <p1>Other</p1>
                
                
                <PBOther numberOfTasks={taskDict["Other"]["totalTasks"]} tasksDone={taskDict["Other"]["tasksDone"]} />
                    
            </div>

		</div>
			
	)

}

export default App
