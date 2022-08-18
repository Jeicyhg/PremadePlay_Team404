import "./Registration.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ProfilesDataService from "../services/profiles";

const Registration = ({user}) => {
    const navigate = useNavigate();
    let params = useParams();
    const location = useLocation();

    let editing = false;

    const [profile, setProfile] = useState({
		user_id: "",
		name: "",
		rank: "",
		role: "",
		server: "",
		language: "",
		profile_pic: "",
		date: "",
	});
    let name = ""
    if(location.state && location.state.currentProfile) {
        editing =true;
        name = location.state.currentProfile.name;
    }
	

    const save = () => {
        var profile_pic = document.getElementById('profile_pic').value;
        var userName =  document.getElementById('userName').value;
        var server =  document.getElementById('server').value;
        var language =  document.getElementById('language').value;
        var primaryRole =  document.getElementById('primaryRole').value;
        var secondaryRole =  document.getElementById('secondaryRole').value;
        var soloRank =  document.getElementById('soloRank').value;
        var flexRank =  document.getElementById('flexRank').value;
        var tftRank =  document.getElementById('tftRank').value;
        var res = {
            user_id: user.email,
            name: userName,
            profile_pic: profile_pic,
            server: server,
            language: language,
            primary_role: primaryRole,
            secondary_role: secondaryRole,
            solo_rank: soloRank,
            flex_rank: flexRank,
            tft_rank: tftRank
        }
        console.log(editing);
        if(userName !== "") {
            if(!editing){
                ProfilesDataService.setNewProfile(res)
                .then(response => {
                    navigate("/home");
                })
                .catch(e=> {
                    console.log(e)
                })
            } else {
                ProfilesDataService.updateProfile(res)
                .then(response => {
                    navigate("/home");
                })
                .catch(e=> {
                    console.log(e)
                })
            }
        }
    }

    return(
        <Form class="needs-validation" noValidate>
            <Row>
                <Image className="bigPicture" src={"/images/photoes/" + "0" + ".jpeg"}/>
                <Image className="bigPicture" src={"/images/photoes/" + "1" + ".jpeg"}/>
                <Image className="bigPicture" src={"/images/photoes/" + "2" + ".jpeg"}/>
                <Image className="bigPicture" src={"/images/photoes/" + "3" + ".jpeg"}/>
                <Image className="bigPicture" src={"/images/photoes/" + "4" + ".jpeg"}/>
            </Row>
            <Row class="form-row">
                    
                
                <div class="col-md-4 mb-3">
                    <label for="validationCustom02">profile_pic</label>
                    <select type="text" class="form-control" id="profile_pic" >
                        <option value = "0">Orianna</option>
                        <option value = "1">Caitlyn</option>
                        <option value = "2">Rek'Sai</option>
                        <option value = "3">Sejuani</option>
                        <option value = "4">Vayne</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom01">User Name</label>
                    <input type="text" class="form-control" id="userName" placeholder="User Name"  required/>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom02">Server</label>
                    <select type="text" class="form-control" id="server">
                        <option >BR</option>
                        <option >EUNE</option>
                        <option >EUW</option>
                        <option >LAN</option>
                        <option >LAS</option>
                        <option >NA</option>
                        <option >OCE</option>
                        <option >RU</option>
                        <option >TR</option>
                        <option >JP</option>
                        <option >SEA</option>
                        <option >KR</option>
                        <option >CN</option>
                        <option >PBE</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom0ˇ">Language</label>
                    <select type="text" class="form-control" id="language">
                        <option >English</option>
                        <option >Mandarin</option>
                        <option >Spanish</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom0ˇ">Primary Role</label>
                    <select type="text" class="form-control" id="primaryRole">
                        <option >TOP</option>
                        <option >MID</option>
                        <option >BOT</option>
                        <option >SUP</option>
                        <option >JGL</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom0ˇ">Secondary Role</label>
                    <select type="text" class="form-control" id="secondaryRole">
                        <option >TOP</option>
                        <option >MID</option>
                        <option >BOT</option>
                        <option >SUP</option>
                        <option >JGL</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom0ˇ">Solo Rank</label>
                    <select type="text" class="form-control" id="soloRank">
                        <option >Iron</option>
                        <option >Bronze</option>
                        <option >Silver</option>
                        <option >Gold</option>
                        <option >Platinum</option>
                        <option >Diamond</option>
                        <option >Master</option>
                        <option >Grandmaster</option>
                        <option >Challenger</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom0ˇ">Flex Rank</label>
                    <select type="text" class="form-control" id="flexRank">
                        <option >Iron</option>
                        <option >Bronze</option>
                        <option >Silver</option>
                        <option >Gold</option>
                        <option >Platinum</option>
                        <option >Diamond</option>
                        <option >Master</option>
                        <option >Grandmaster</option>
                        <option >Challenger</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="validationCustom0ˇ">TFT Rank</label>
                    <select type="text" class="form-control" id="tftRank">
                        <option >Iron</option>
                        <option >Bronze</option>
                        <option >Silver</option>
                        <option >Gold</option>
                        <option >Platinum</option>
                        <option >Diamond</option>
                        <option >Master</option>
                        <option >Grandmaster</option>
                        <option >Challenger</option>
                    </select>
                </div> 
                
            </Row>
            <Button className ="btn btn-primary" variant="primary" onClick = {save}>Submit</Button>
        </Form>
    );
};

export default Registration;