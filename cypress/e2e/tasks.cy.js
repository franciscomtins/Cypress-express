/// <reference types="cypress" />
//import {faker} from '@faker-js/faker'

describe('tarefas', () =>{

    let testData;

    before(()=> {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

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
    
        it.only('não deve permitir tarefa duplicada', ()=> {
    
            const task =  testData.dup
                
            cy.removeTaskByName(task.name).then(() => {
                cy.contains('p', task.name).should('not.exist')
            });
            
            cy.postTask(task).then(() => {
                cy.contains('p', task).should('be.visible')
            })

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

        it('Deve concluir uma tarefa', ()=> {

            const task = {
                name: 'Pagar contas de consumo',
                is_done: false
            } 

            cy.visit('/')

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

    context('exclusão', () => {

        it('Deve remover uma tarefa', ()=> {
            const task = {
                name: 'Estudar javascript',
                is_done: false
            } 

            cy.visit('/')

            cy.removeTaskByName(task.name)
            cy.postTask(task) 

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')       
        })
    })


})


