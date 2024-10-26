import React, {useEffect, useState, useRef} from 'react'
import { useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';
// codemirror components
import { useCodeMirror } from '@uiw/react-codemirror';

// import languages 
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';

// import themes 
import { githubDark } from '@uiw/codemirror-theme-github';
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import { solarizedDark } from '@uiw/codemirror-theme-solarized';
import "../styles/editor.css"
import { toast } from 'react-hot-toast';

var qs = require('qs');


// const extensions = [javascript()]


const Editor = ({ sendHandler, roomId, onCodeChange, code, lang }) => {
    const history = useLocation()
    const location = useLocation()
    // const uname = location?.state?.username
    const [theme, setTheme] = useState(githubDark);
    // const [code, se==1ode] = useState(code);
    const [selectValue, setSelectValue] = useState('javascript')
    const [extensions, setExtensions] = useState([javascript()])
    const [placeholder, setPlaceholder] = useState('Please enter the code.');
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    // const [ran, setran] = useState(false)
    const [tc,setTc] = useState(true)
    const thememap = new Map()
    const langnMap = new Map()
    
    const editorRef = useRef(null)
    const {setContainer} = useCodeMirror({
        container: editorRef.current,
        extensions,
        value: code,
        theme,
        editable: true,
        height: `70vh`,
        width:`45vw`,
        basicSetup:{
            foldGutter: false,
            dropCursor: false,
            indentOnInput: false,
        },
        options:{
            autoComplete:true,
            },
        placeholder : placeholder,
        style : {
            position: `relative`,
            zIndex: `999`,
            borderRadius: `10px`,
          },
        onChange:  (value) => {
            onCodeChange(value)
            sendHandler(3,{value})
        }

    })


    const themeInit = () => {
        thememap.set("githubDark",githubDark)
        thememap.set("xcodeDark",xcodeDark)
        thememap.set("eclipse",eclipse)
        thememap.set("xcodeLight",xcodeLight)
        thememap.set("abcdef",abcdef)
        thememap.set("solarizedDark",solarizedDark)
    }

    const langInit = () => {
        langnMap.set('java', java)
        langnMap.set('cpp', cpp)
        langnMap.set("javascript", javascript)
        langnMap.set('python', python)
    }


    const handleThemeChange = (event) => {
        setTheme(thememap.get(event.target.value));
    };

    const handleLanguageChange =  (event) => {
        setExtensions([langnMap.get(event.target.value)()]);
        
        sendHandler(4,{newLang : event.target.value})
        setSelectValue(event.target.value)
    };

    themeInit()
    langInit()

    function langCode(e) {
        if(e==='javascript') return 'js';
        else if(e==='python') return 'py';
        return e;
    }

    useEffect(() => {
        if(!editorRef.current) {
            alert('error loading editor')
            history('/')
        }
        if(editorRef.current) {
            setContainer(editorRef.current)
        }

    },[editorRef.current])

    useEffect(() => {
        if(lang!==selectValue && lang) {
            setSelectValue(lang)
            setExtensions([langnMap.get(lang)()]);
        }
    },[lang])

    const compile = (e) => {
        e.preventDefault();
        var data = qs.stringify({
            'code': code,
            'language': langCode(selectValue),
            'input': input
        });
        var config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : data
        };
        fetch('https://api.codex.jaagrav.in',config)
        .then(res => res.json())
        .then(data => {
            if(data['error'].length===0) {
                setTc(true)
                toast.success("compiled sucessfully")
                setOutput(data['output'])
            }
            else {
                setTc(false)
                toast.error("compilation error")
                setOutput(data['error'])
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleInputChange =(e) => {
        setInput(e.target.value)
    }
    const handleOutputChange = (e) => {
        setOutput(e.target.value)
    }

    return (
        <div className='editorcomponent'>
            <div></div>
            <span>Theme:</span>
            <select onChange={handleThemeChange} >
                <option default value={"githubDark"}>githubDark</option>
                <option value={"eclipse"}>eclipse</option>
                <option value={"xcodeLight"}>xcodeLight</option>
                <option value={"xcodeDark"}>xcodeDark</option>
                <option value={"solarizedDark"}>solarizedDark</option>
                <option value={"abcdef"}>abcdef</option>
            </select>
            <span>Lang:</span>
            <select onChange={handleLanguageChange} value={selectValue}>
                <option default value={"javascript"}>JS</option>
                <option value={"java"}>Java</option>
                <option value={"cpp"}>Cpp</option>
                <option value={"python"}>Python</option>
            </select>
            <button className='run ' onClick={compile}  >Run</button>
            <div ref={editorRef} className='ide' ></div>
            <div className='iodiv d-flex flex-wrap'>
                <Form.Group className="mb-3 ioarea" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Input</Form.Label>
                    <Form.Control as="textarea" rows={2} value={input} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3 ioarea" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Output</Form.Label>
                    <Form.Control as="textarea" rows={2} value={output} className={tc ? 'ctxt' : 'etxt'} onChange={handleOutputChange} disabled/>
                </Form.Group>

            </div>
        </div>
    );
}

export default Editor