/// <reference types="cypress" />
//import {faker} from '@faker-js/faker'

describe('tarefas', () =>{

    context('cadastro', () => {

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
    
        it('campo obrigatório', ()=> {
            cy.createTask()
            cy.isRequired('This is a required field')
        }) 

    })

    context('atualização', () => {

        it.only('Deve concluir uma tarefa', ()=> {
            const task = {
                name: 'Pagar contas de consumo',
                is_done: false
            } 

            cy.visit('http://localhost:3000/')

            cy.removeTaskByName(task.name)
            cy.postTask(task) 

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })



    })


})


