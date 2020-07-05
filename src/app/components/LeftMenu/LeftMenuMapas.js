import React, {Component} from 'react';
import {Link} from "react-router";

export default class LeftMenuMapas extends Component {

    render() {

        var myStyle = {
            urbanismo: {
                borderLeft: '7px solid #40BFEF',
                dataColor: '#40BFEF'
            },
            cultura: {
                borderWidth: '0px 0px 0px 7px',
                borderLeft: '7px solid rgb(229, 51, 42)',
                display: 'list-item',
                dataColor: '#E5332A'
            },
            servicios: {
                borderLeft: '7px solid rgb(255, 211, 0)',
                display: 'list-item',
                dataColor: '#FFD300'
            },
            turismo: {
                borderWidth: '0px 0px 0px 7px',
                borderLeft: '7px solid rgb(0, 167, 106)',
                display: 'list-item',
                dataColor: '#00A76A'
            },
            esparcimiento: {
                borderWidth: '0px 0px 0px 7px',
                borderLeft: '7px solid rgb(0, 167, 106)',
                display: 'list-item',
                cursor: 'default',
                dataColor: '#C8A2C8',
            }
        };

        return (
            <div>

                <div id="mapas" class="tab-pane clearfix active">

                    <div class="clearfix">

                        <ul class="unstyled categorias color disable-select">

                            <li class="categoria" style={myStyle.urbanismo} >
                                <button type="button" class="close close-categoria" aria-hidden="true">×</button>
                                <h1>Bandas en Vivo</h1>
                                <p class="resumen">Recitales, mini Recitales, presentaciones en vivo, Zapadas, etc</p>
                            </li>

                            <Link to="/mapas/bares" activeClassName="active" style={{ textDecoration: 'none' }}>
                            <li class="categoria" style={myStyle.esparcimiento}>
                                <h1>Esparcimiento</h1>
                                <p class="resumen">Bares, Recitales, Movida Nocturna</p>
                            </li>
                            </Link>

                            <li class="categoria" style={myStyle.cultura}>
                                <button type="button" class="close close-categoria" aria-hidden="true">×</button>
                                <h1>Teatros</h1>
                                <p class="resumen">Obras de teatros, Centros Culturales, Galerías, Bares Culturales, etc.</p>
                            </li>

                            <li class="categoria" style={myStyle.servicios}>
                                <button type="button" class="close close-categoria" aria-hidden="true">×</button>
                                <h1>Bailes populares</h1>
                                <p class="resumen">Milongas, Peñas, Salsa, Bachata, Kizomba, Cumbia, etc.</p>
                            </li>

                            <li class="categoria" style={myStyle.turismo}>
                                <button type="button" class="close close-categoria" aria-hidden="true">×</button>
                                <h1>Otros</h1>
                                <p class="resumen">Eventos particulares, alternativas diferentes...</p>
                            </li>

                        </ul>

                    </div>
                </div>

            </div>
        );
    }
}
