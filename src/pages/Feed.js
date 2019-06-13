import React, { Component } from 'react'

import io from 'socket.io-client'

import api from '../services/API'

import './Feed.css'

import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'
export default class Feed extends Component {
    state = {
        feed: [],
    }
    async componentDidMount() {
        this.registerToSocket()

        const response = await api.get('posts')
        this.setState({ feed: response.data })
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3001')

        socket.on('post', post => {
            this.setState({ feed: [post, ...this.state.feed] })
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => {
                   return post._id === likedPost._id ? likedPost : post
                })
            })
        })
    }

    darLike = id => {
        console.log(`/posts/${id}/like`)
        api.post(`/posts/${id}/like`)

    }
    render() {
        return (
            <section id="post-list">
                {this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt="mais" />
                        </header>
                        <img src={`http://localhost:3001/files/${post.image}`} alt="postagem" />
                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.darLike(post._id)}>
                                    <img src={like} alt="curtidas" />
                                </button>
                                <img src={comment} alt="comentarios" />
                                <img src={send} alt="compartilhar" />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>{post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                ))}
            </section>
        )
    }
}
