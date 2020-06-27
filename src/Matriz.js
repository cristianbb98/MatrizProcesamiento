import React from 'react';
import { Component } from 'react';
import axios from 'axios'
export default class Matriz extends Component {


    caracteres = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"]
    constructor() {
        super()
        this.state = {
            matrizNumeros: null,
            matrizCaracteres: null,
            n: null,
            m: null,
            matrizProcesada: null
        }
        this.crearMatriz.bind(this)
        this.llenarMatriz.bind(this)
        this.handleDimension.bind(this)
        this.onChangeMatriz.bind(this)
        this.enviarMatriz.bind(this)
    }

    handleDimension = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onChangeMatriz = (e) => {
        let dimensiones = String([e.target.id]).split('|')
        let matrizNumeros = this.state.matrizNumeros
        matrizNumeros[dimensiones[0]][dimensiones[1]] = Number(e.target.value)
        this.setState({ matrizNumeros: matrizNumeros })
    }

    llenarMatriz = (valor) => {
        var result = []
        for (var i = 0; i < Number(this.state.n); i++) {
            result.push(new Array(Number(this.state.m)).fill(valor))
        }
        return result
    }

    crearMatriz = () => {
        let matrizNumeros = this.llenarMatriz(0)
        this.setState({ matrizNumeros: matrizNumeros })
    }

    enviarMatriz = () => {
        if (this.state.matrizNumeros) {
            console.log(this.state.matrizNumeros)
            axios.post('https://young-fortress-17782.herokuapp.com/imagen',
                {
                    matriz: this.state.matrizNumeros
                }
            ).then(async res => {
                let matrizProcesadaAux = await res.data
                console.log(matrizProcesadaAux)
                this.setState({ matrizProcesada: matrizProcesadaAux['imagen_filtrada'] })
            }).catch(error => {
                alert('Error al recibir datos')
            }
            )
        }
    }

    render() {

        return (
            <div className="container">
                <div className="dimensiones">
                    <label htmlFor="n">N: </label>
                    <input type="number" name="n" id="n" onChange={this.handleDimension} />
                    <label htmlFor="m">M: </label>
                    <input type="number" name="m" id="m" onChange={this.handleDimension} />
                    <p>Dimensiones</p>
                    <button className="btn btn-warning" onClick={() => this.crearMatriz()}>Crear matriz </button>
                </div>
                <div className="matriz">
                    {this.state.matrizNumeros != null ?
                        <React.Fragment>
                            <React.Fragment>
                                <table>
                                    <thead>
                                        <th></th>
                                        {this.state.matrizNumeros[0].map((matriz, x) => {
                                            return <th>{x + 1}</th>
                                        })}
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.matrizNumeros.map((matriz, x) => {
                                                return <tr><th>{x + 1}</th>{matriz.map((valor, y) => {
                                                    return <td><input id={`${x}|${y}`} type="number" min="0" max="90" step="10" defaultValue={valor} onChange={this.onChangeMatriz} /></td>
                                                })} </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </React.Fragment>
                            <React.Fragment>
                                <table>
                                    <thead>
                                        <th></th>
                                        {this.state.matrizNumeros[0].map((matriz, x) => {
                                            return <th>{x + 1}</th>
                                        })}
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.matrizNumeros)}
                                        {
                                            this.state.matrizNumeros.map((matriz, x) => {
                                                return <tr><th>{x + 1}</th>{matriz.map((valor, y) => {
                                                    return <td>{this.caracteres[Number(valor) / 10]}</td>
                                                })} </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button className="btn btn-success" onClick={() => this.enviarMatriz()}> Procesar </button>
                            </React.Fragment>
                        </React.Fragment>
                        : null}
                </div>
                {
                    this.state.matrizProcesada != null ?
                        <React.Fragment>
                            <React.Fragment>
                                <table>
                                    <thead>
                                        <th></th>
                                        {this.state.matrizProcesada[0].map((matriz, x) => {
                                            return <th>{x + 1}</th>
                                        })}
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.matrizProcesada.map((matriz, x) => {
                                                return <tr><th>{x + 1}</th>{matriz.map((valor) => {
                                                    return <td>{valor}</td>
                                                })} </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </React.Fragment>
                            <React.Fragment>
                                <table>
                                    <thead>
                                        <th></th>
                                        {this.state.matrizProcesada[0].map((matriz, x) => {
                                            return <th>{x + 1}</th>
                                        })}
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.matrizProcesada.map((matriz, x) => {
                                                return <tr><th>{x + 1}</th>{matriz.map((valor) => {
                                                    return <td>{this.caracteres[Number(valor / 10)]}</td>
                                                })} </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </React.Fragment>
                        </React.Fragment>
                        :
                        null
                }
            </div >
        );
    }
}