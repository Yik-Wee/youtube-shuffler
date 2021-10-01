import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';

type SearchProps = {
    history: any;
    // setSearched(searched: { id: string, ch: string, title: string, thumb: string | undefined }): void;
}

class Search extends React.Component<SearchProps, { value: string }> {
    styles: any;

    constructor(props: SearchProps) {
        super(props);
        this.state = { value: '' };
        this.styles = {
            form: {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            },
            label: {
                width: '30vw',
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: event.target.value });
    }

    parseParams(paramString: string): string[] {
        /**
         * Convert paramString into token list
         * @param paramString the part of url after the domain (e.g. 'playlist?list=...')
         */
        const DELIMITERS = '?&';
        const chars = Array.from(paramString);
        let buffer = '';
        let params: string[] = [];

        chars.forEach((c: string) => {
            if (DELIMITERS.includes(c)) {
                params.push(buffer);
                buffer = '';
            } else {
                buffer += c;
            }
        });

        params.push(buffer);
        return params;
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        let id: string = this.state.value;

        // get id from url if url is passed
        // e.g. 'https://www.youtube.com/playlist?list=' or 'https://www.youtube.com/watch?v=OmuW_v5LoIU&list='
        const baseURL = 'https://www.youtube.com/';
        if (this.state.value.startsWith(baseURL)) {
            const paramString = this.state.value.substring(baseURL.length);
            const params = this.parseParams(paramString);
            console.log({ params });

            const paramType = 'list=';

            for (let p of params) {
                if (p.startsWith(paramType)) {
                    id = p.substring(paramType.length);
                    break;
                }
            }
        }

        this.props.history.push(`/playlist/${id}`);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={this.styles.form}>
                <label>
                    <TextField
                        // id="standard-basic" 
                        id="search"
                        label="Playlist ID" 
                        onChange={this.handleChange}
                        color='primary'
                        style={this.styles.label}
                    ></TextField>
                </label>
                <Button type="submit" color='primary'><SearchRounded/></Button>
            </form>
        );
    }
}

export default Search;