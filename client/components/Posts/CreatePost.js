import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

import { createPost } from '../../ducks/posts';
import renderField from '../Field/renderField';

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div>
            <Dropzone
                name={field.name}
                onDrop={(filesToUpload) => field.input.onChange(filesToUpload)}
            >
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    {files.map((file, i) => <li key={i}>{file.name}</li>)}
                </ul>
            )}
        </div>
    );
};

class CreatePost extends React.Component {
    onSubmit(values) {
        const body = new FormData();
        Object.keys(values).forEach((key) => {
            key === 'image' ?
                body.append(key, values[key][0]) :
                body.append(key, values[key]);
        });

        this.props.createPost(body);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="todos-new">
                <h3>New Post</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
                    <Field name="description" component={renderField} placeholder="Description"/>
                    <Field name="image" component={renderDropzoneInput}/>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link to="/" className="btn btn-danger margin-left-sm">
                        Cancel
                    </Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.content) {
        errors.content = 'Please enter content to submit or press cancel';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'CreatePostForm',
})(connect(null, { createPost })(CreatePost));
