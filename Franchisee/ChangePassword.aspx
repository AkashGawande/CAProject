<%@ Page Title="" Language="C#" MasterPageFile="~/Franchisee/FranchiseeMaster.master" AutoEventWireup="true" CodeFile="ChangePassword.aspx.cs" Inherits="Franchisee_ChangePassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Franchisee_JS/ChangePassword.js"></script>

    <style>
        /*p {
            font-size: 40px;
        }*/
        .loader {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url('../Logo/ajax-loader.gif') 50% 50% no-repeat rgb(249,249,249);
            opacity: .8;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="loaderFranchiseeProf" class="loader" style="display:none;"></div>
    <div class="main-content">
        <div class="main-content-inner">
            <div class="breadcrumbs ace-save-state" id="breadcrumbs">
                <ul class="breadcrumb">
                    <li>
                        <i class="ace-icon fa fa-home home-icon"></i>
                        <a href="#">home</a>
                    </li>
                    <li class="active">Change Password</li>
                </ul>
                <div class="nav-search" id="nav-search">
                    <form class="form-search">
                        <span class="input-icon">
                            <input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
                            <i class="ace-icon fa fa-search nav-search-icon"></i>
                        </span>
                    </form>
                </div>
                <!-- /.nav-search -->
            </div>

            <div class="page-content">
                <br />
                <br />
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="tabbable">
                                    <div class="tab-content no-border no-padding">
                                        <div class="tab-content no-border no-padding">
                                            <div id="inbox" class="tab-pane in active">
                                                <div class="message-container">
                                                    <div class="message-list-container">
                                                        <div class="message-list" id="message-list">
                                                            <div class="row">
                                                                <div class="col-lg-12">
                                                                    <div class="panel panel-default">
                                                                        <div class="panel-body" style="padding: 15px">
                                                                            <%--<div class="page-header">--%>
                                                                            <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <div class="panel panel-default">
                                                                                        <div class="panel-body" style="padding: 15px">
                                                                                            <div class="page-header">
                                                                                                <h1>Change Password</h1>
                                                                                            </div>
                                                                                            <div class="box">

                                                                                                <div id="collapseOne" class="accordion-body collapse in body">
                                                                                                    <form action="#" class="form-horizontal" id="block-validate">
                                                                                                        <div class="form-group">
                                                                                                            <label class="control-label col-lg-4">Old Password
                                                                                                                <label style="color: red;">*</label></label>
                                                                                                            <div class="col-lg-4">
                                                                                                                <input type="password" id="password" name="password" placeholder="Enter Old Password" class="form-control" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div class="form-group">
                                                                                                            <label class="control-label col-lg-4">New Password
                                                                                                                <label style="color: red;">*</label></label>

                                                                                                            <div class="col-lg-4">
                                                                                                                <input type="password" id="password2" name="password2" placeholder="Enter New Password" class="form-control" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div class="form-group">
                                                                                                            <label class="control-label col-lg-4">Confirm New Password
                                                                                                                <label style="color: red;">*</label></label>

                                                                                                            <div class="col-lg-4">
                                                                                                                <input type="password" id="confirm_password2" name="confirm_password2" onblur="CheckPassword()" placeholder="Confirm New Password" class="form-control" />
                                                                                                                <label id="ErrorMessage" style="display: none; color: red; font-size: 15px; font-family: Calibri">New Password Does Not Match</label>
                                                                                                            </div>
                                                                                                        </div>


                                                                                                        <div class="form-actions no-margin-bottom" style="text-align: center;">
                                                                                                            <input type="button" value="Change Password" id="btnChange" class="btn btn-primary btn-sm btn-success" />
                                                                                                            <input type="button" value="Cancel" id="btnCancel" class="btn btn-primary btn-sm btn-danger" />
                                                                                                        </div>

                                                                                                    </form>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- /.tab-content -->
                                    </div>
                                    <!-- /.tabbable -->
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <!-- PAGE CONTENT ENDS -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.page-content -->
            </div>
        </div>
        <!-- /.main-content -->
    </div>
        <script src="../assets/js/bootstrap.min.js"></script>
</asp:Content>
