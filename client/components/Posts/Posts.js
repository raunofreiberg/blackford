import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';

import * as styles from './Posts.scss';
import { fetchPosts, deletePost, editPost } from '../../ducks/posts';
import Icon from '../Icons';
import Spinner from '../Spinner/Spinner';

class Posts extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
        }).isRequired,
        isAuthorized: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        posts: PropTypes.arrayOf(PropTypes.shape({
            avatar: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.string.isRequired,
            posted_at: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            user_id: PropTypes.number.isRequired,
        })).isRequired,
        deletePost: PropTypes.func.isRequired,
        fetchPosts: PropTypes.func.isRequired,
        editPost: PropTypes.func.isRequired,
    };

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.props.fetchPosts();
        }
    }

    handleDescriptionChange = (postId, e) => {
        this.props.editPost(postId, {
            description: e.target.value,
        });
    };

    renderActionBtns = postId => (
        <div className={styles.postActions}>
            <button
                className={styles.delPost}
                onClick={() => this.props.deletePost(postId)}
            >
                <Icon icon="trash" />
            </button>
        </div>
    );

    renderEditableDesc = (postDesc, postId) => [
        <input
            type="text"
            defaultValue={postDesc}
            key={postDesc}
            onBlur={e => this.handleDescriptionChange(postId, e)}
        />,
        <span
            className={classNames('inputBar', styles.inputBar)}
            key={postId}
        />,
    ];

    renderPosts(posts) {
        if (this.props.isLoading) {
            return <Spinner />;
        } else {
            return (
                <div className={classNames('container', styles.postsWrapper)}>
                    {posts.map(post => (
                        <div className={styles.post} key={post.id}>
                            <div className={styles.postHeader}>
                                <div className={styles.postInfo}>
                                    {post.avatar ?
                                        <div
                                            className={styles.postAvatar}
                                            style={{ backgroundImage: `url(${post.avatar}` }}
                                        />
                                        :
                                        <div
                                            className={classNames(styles.postAvatar, styles.postInitials)}
                                        >
                                            {post.username.charAt(0)}
                                        </div>
                                    }
                                    <span className={styles.postUser}>{post.username}</span>
                                </div>
                                {this.props.user.id === post.user_id ? this.renderActionBtns(post.id) : ''}
                            </div>
                            <div
                                className={styles.postImage}
                                style={{ backgroundImage: `url(./uploads/${post.image})` }}
                            />
                            <div className={styles.postDesc}>
                                <span className={styles.postDate}>{moment(post.posted_at).fromNow()}</span>
                                {
                                    this.props.user.id === post.user_id ?
                                        this.renderEditableDesc(post.description, post.id) :
                                        <p>{post.description}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }

    render() {
        const { posts } = this.props;

        return posts ? this.renderPosts(posts) : 'Nothing';
    }
}


const mapStateToProps = state => ({
    posts: state.posts.posts,
    user: state.user.user,
    isAuthorized: state.user.isAuthorized,
    isLoading: state.posts.isLoading,
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: postId => dispatch(deletePost(postId)),
    editPost: (postId, value) => dispatch(editPost(postId, value)),
});

const PostsConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Posts);

export default PostsConnector;
