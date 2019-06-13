import React, { Component } from 'react'
import api from '../services/API'

import './New.css'

export default class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    }

    pegaInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    pegaImage = e => {
        this.setState({ image: e.target.files[0] })
    }
    enviarForm = async e => {
        e.preventDefault()

        const data = new FormData();
 
        data.append('author', this.state.author)
        data.append('place', this.state.place)
        data.append('description', this.state.description)
        data.append('hashtags', this.state.hashtags)
        data.append('image', this.state.image)
 
        await api.post('posts', data)

        this.props.history.push('/')
    }
    render() {
        return (
            <form id="new-post" onSubmit={this.enviarForm}>
                <input type="file" onChange={this.pegaImage} />

                <input type="text" name="author" placeholder="Quem é você?"
                    onChange={this.pegaInput} />
                <input type="text" name="place" placeholder="Qual sua cidade cidade?"
                    onChange={this.pegaInput} />
                <input type="text" name="description" placeholder="Descrição do que está enviando"
                    onChange={this.pegaInput} />
                <input type="text" name="hashtags" placeholder="Hashtags do que está enviando"
                    onChange={this.pegaInput} />

                <button type="submit">enviar</button>
            </form>
        )
    }
}
