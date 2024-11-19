/// <reference types="cypress" />
//import {faker} from '@faker-js/faker'

describe('tarefas', () =>{

    it('deve cadastrar uma nova tarefa', ()=> {

        const taskName = 'Ler um livro de Node.js'

        cy.removeTaskByName(taskName)
        cy.createTask(taskName)

        // cy.get('main div p')
        //     .should('be.visible')
        //     .should('have.text', 'Ler um livro de Node.js')

        cy.contains('main div p', taskName)
            .should('be.visible')
    })

    it('não deve permitir tarefa duplicada', ()=> {

        const task =  {
            "name": 'Estudar javascript',
            "is_done": false
        }
            
        cy.removeTaskByName(task.name)
        cy.postTask(task)
        cy.createTask(task.name)

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })    

    it.only('campo obrigatório', ()=> {
        cy.createTask()
        cy.isRequired('This is a required field')
    })

})


