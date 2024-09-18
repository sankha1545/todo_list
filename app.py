from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    due_time = db.Column(db.Date, nullable=False)
    priority_level = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Pending')

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    tasks = Task.query.all()
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task = request.form['task']
    description = request.form['description']
    due_time = datetime.strptime(request.form['due_time'], '%Y-%m-%d').date()
    priority_level = request.form['priority_level']
    new_task = Task(task=task, description=description, due_time=due_time, priority_level=priority_level)
    db.session.add(new_task)
    db.session.commit()
    return redirect('/')

@app.route('/get_task/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify({
        'id': task.id,
        'task': task.task,
        'description': task.description,
        'due_time': task.due_time.strftime('%Y-%m-%d'),
        'priority_level': task.priority_level,
        'status': task.status
    })

@app.route('/update/<int:task_id>', methods=['POST'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    task.task = request.form['task']
    task.description = request.form['description']
    task.due_time = datetime.strptime(request.form['due_time'], '%Y-%m-%d').date()
    task.priority_level = request.form['priority_level']
    task.status = request.form['status']
    db.session.commit()
    return redirect('/')

@app.route('/delete/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
