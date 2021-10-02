import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';

interface SearchProps {
    history: any;
}

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
        event.preventDefault();
        
        // get id from url if url is passed
        // e.g. 'https://www.youtube.com/playlist?list=' or 'https://www.youtube.com/watch?v=OmuW_v5LoIU&list='
        const baseURL = 'https://www.youtube.com/';
        let id = this.state.value.trim();

        if (id.startsWith(baseURL)) {
            // get list= param from url string (playlist id)
            const regexp = /[&?]list=([^&\s:/]+)/i;
            const results = regexp.exec(id);
            console.log(results)
            
            if (!results)
                return

            id = results[1].trim();
        }
        
        if (!id)
            return

        this.props.history.push(`/playlist/${id}`);
    }

    render() {
        const styles = {
            form: {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            },
            label: {
                width: '30vw',
            },
        };

        return (
            <form onSubmit={this.handleSubmit} style={styles.form}>
                <label>
                    <TextField
                        id="search"
                        label="Playlist ID"
                        onChange={this.handleChange}
                        color='primary'
                        style={styles.label}
                    ></TextField>
                </label>
                <Button type="submit" color='primary'><SearchRounded /></Button>
            </form>
        );
    }
}

export default Search;