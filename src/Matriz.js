import React from 'react';
import { Component } from 'react';
import axios from 'axios'
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';
export default class Matriz extends Component {


    caracteres = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"]
    colores = ["#FAFAFA", "#F5F5F5", "#EEEEEE", "#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575", "#616161", "#424242", "#212121"]
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
                <div className="row">
                    <div className="archivo col-md-12 m-4">
                        <CSVReader onFileLoaded={(data, fileInfo) => {
                            this.setState({ matrizNumeros: data, matrizCaracteres: null })
                        }}
                            inputStyle={{ color: 'green' }} />
                    </div>
                </div>
                <div className="dimensiones row">
                    <div className="col">
                        <h3>Dimensiones de la matriz</h3>
                    </div>
                    <div className="col">
                        <label htmlFor="n">N: </label>
                        <input type="number" name="n" id="n" onChange={this.handleDimension} />
                    </div>
                    <div className="col">
                        <label htmlFor="m">M: </label>
                        <input type="number" name="m" id="m" onChange={this.handleDimension} />
                    </div>
                    <div className="col">
                        <button className="btn btn-warning" onClick={() => this.crearMatriz()}>Crear matriz</button>
                    </div>
                    {/* <div className="col">
                        <button className="btn btn-secondary" onClick={() => this.limpiarMatriz()}>Limpiar matriz</button>
                    </div> */}
                </div>
                <div className="caracteres row justify-align-center">
                    <div className="col">
                        <table>
                            <thead>
                                <th>Rango</th>
                                <th>Caracter</th>
                            </thead>
                            <tbody>
                                {Array.from(this.caracteres).map((caracter, index) => {
                                    return (<tr><td>{index * 10} - {index * 10 + 9}</td><td>{caracter}</td></tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="matriz">
                    <div className="row">
                        {this.state.matrizNumeros != null ?
                            <React.Fragment>
                                <React.Fragment>
                                    <div className="col-lg-12">
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
                                    </div>
                                </React.Fragment>
                                <React.Fragment>
                                    <div className="col-lg-12">
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
                                                            return <td>{this.caracteres[Number(valor) / 10]}</td>
                                                        })} </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-success" onClick={() => this.enviarMatriz()}> Procesar </button>
                                    </div>
                                </React.Fragment>
                            </React.Fragment>
                            : null}
                    </div>
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
                            <table>
                                <thead>
                                    <th></th>
                                    {this.state.matrizProcesada[0].map((matriz, x) => {
                                        return <th>{x + 1}</th>
                                    })}
                                </thead>
                                <tbody>
                                    {this.state.matrizProcesada.map((matriz, x) => {
                                        return <tr><th>{x + 1}</th>{matriz.map((valor) => {
                                            return <td><p style={{ backgroundColor: this.colores[Number(valor / 10)], color: this.colores[Number(valor / 10)] }} key={x}>{valor}</p></td>
                                        })} </tr>
                                    })
                                    }
                                </tbody>
                            </table>

                            <CSVLink data={this.state.matrizProcesada} separator={";"}>
                                <button className="btn btn-info">Guardar archivo</button>
                            </CSVLink>
                        </React.Fragment>

                        :
                        null
                }
            </div >
        );
    }
}