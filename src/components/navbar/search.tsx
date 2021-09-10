import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';

type SearchProps = { history: any; }

class Search extends React.Component<SearchProps, { value: string }> {
    constructor(props: SearchProps) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        console.log(this.state.value);
        this.props.history.push(`/playlist?id=${this.state.value}`);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <label>
                    <TextField
                        id="standard-basic" 
                        label="Playlist ID" 
                        onChange={this.handleChange}
                        color='primary'
                        style={{ width: '30vw' }}
                    ></TextField>
                </label>
                <Button type="submit" color='primary'><SearchRounded/></Button>
            </form>
        );
    }
}

export default Search;