import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
        <div className="post__header-actions">
            <button
                className="post__header-actions-del"
                onClick={() => this.props.deletePost(postId)}
            >
                <Icon icon="trash" key={postId} />
            </button>
        </div>
    );

    renderEditableDesc = (postDesc, postId) => [
        <input
            type="text"
            defaultValue={postDesc}
            key={postDesc}
            onChange={e => this.handleDescriptionChange(postId, e)}
        />,
        <span
            className="input__bar"
            key={postId}
        />,
    ];

    renderPosts(posts) {
        if (this.props.isLoading) {
            return <Spinner />;
        } else {
            return (
                <div className="posts__container container">
                    <div className="text-right">
                        <Link to="/posts/new" className="btn btn-primary">New Post</Link>
                    </div>
                    <h1>Feed</h1>
                    {posts.map(post => (
                        <div className="post" key={post.id}>
                            <div className="post__header">
                                <div className="post__header-info">
                                    {post.avatar ?
                                        <div
                                            className="post__avatar"
                                            style={{ backgroundImage: `url(${post.avatar}` }}
                                        />
                                        :
                                        <div
                                            className="post__avatar post__avatar--initials"
                                        >
                                            {post.username.charAt(0)}
                                        </div>
                                    }
                                    <span className="post__header-info-user">{post.username}</span>
                                </div>
                                {this.props.user.id === post.user_id ? this.renderActionBtns(post.id) : ''}
                            </div>
                            <div className="post__image" style={{ backgroundImage: `url(./uploads/${post.image})` }} />
                            <div className="post__description">
                                <span className="post__description-date">{moment(post.posted_at).fromNow()}</span>
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
