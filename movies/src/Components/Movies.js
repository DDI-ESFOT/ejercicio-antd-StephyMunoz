import React, {useEffect, useState} from 'react';
import {Descriptions, Tooltip, Modal, Col, Row, Button, Card, Comment, Avatar, Form, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;



const Movies = ({ movies }) => {
    const [movieId, setMovieId] = useState(null);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Meta } = Card;


    useEffect(()=>{
        const getData = async () =>{
            const response = await fetch(`http://www.omdbapi.com/?apikey=5eb5c92&i=${movieId}`);
            const data = await response.json();
            setCurrentMovie(data);
            console.log('movieid', movieId);
            setMovieId(movies.imdbID);
        }
        getData();
    },[movieId]);
    const handleView = (imdbID) =>{
        setMovieId(imdbID);
        console.log(imdbID);
        setIsModalVisible(true);
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    );
    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </>
    );
    const data = [
        {
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
            ),
        },
        {
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(2, 'days').fromNow()}</span>
                </Tooltip>
            ),
        },
    ];

    return(
        <>
            <Row justify="center" style={{ margin: 10 }}>
            {movies.map((movie)=>(

                <Col span={8}>
                <Card
                style={{ width: 250 }}
                cover={
                <img
                    alt="example"
                    src={movie.Poster}

                />
                }
                >
                <Meta
                  title={movie.Title}
                  description={movie.Year}
                  type="flex" align="middle"
                  />

                    <Button type="primary" onClick={()=>handleView(movie.imdbID)} align="middle" style={{ margin: 10 }}>

                        Show more information

                    </Button>

                        <List
                            className="comment-list"
                            header={`${data.length} replies`}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={item.actions}
                                        author={item.author}
                                        avatar={item.avatar}
                                        content={item.content}
                                        datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />



                    <Modal title="Movie information" visible={isModalVisible} onCancel={handleCancel} >
                        <Descriptions title="Movie Info" bordered>

                            <Descriptions.Item label="Title" span={3}>{currentMovie.Title}</Descriptions.Item>
                            <Descriptions.Item label="Year" span={3}>{currentMovie.Year}</Descriptions.Item>
                            <Descriptions.Item label="Released" span={3}>{currentMovie.Released}</Descriptions.Item>
                            <Descriptions.Item label="Runtime" span={3}>{currentMovie.Runtime}</Descriptions.Item>
                            <Descriptions.Item label="Genre" span={3}>{currentMovie.Genre}</Descriptions.Item>
                            <Descriptions.Item label="Director" span={3}>{currentMovie.Director}</Descriptions.Item>
                            <Descriptions.Item label="Writer" span={3}>{currentMovie.Writer}</Descriptions.Item>
                            <Descriptions.Item label="Actors" span={3}>{currentMovie.Actors}</Descriptions.Item>
                            <Descriptions.Item label="Plot" span={3}>{currentMovie.Plot}</Descriptions.Item>
                            <Descriptions.Item label="Language" span={3}>{currentMovie.Language}</Descriptions.Item>
                            <Descriptions.Item label="Country" span={3}>{currentMovie.Country}</Descriptions.Item>
                            <Descriptions.Item label="Awards" span={3}>{currentMovie.Awards}</Descriptions.Item>
                            <Descriptions.Item label="BoxOffice" span={3}>{currentMovie.BoxOffice}</Descriptions.Item>
                            <Descriptions.Item label="Production" span={3}>{currentMovie.Production}</Descriptions.Item>

                        </Descriptions>
                    </Modal>
                </Card>
                </Col>
            ))
            }
            </Row>
        </>
    );
}

export default Movies;