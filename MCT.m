function varargout = MCT(varargin)

gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
    'gui_Singleton',  gui_Singleton, ...
    'gui_OpeningFcn', @MCT_OpeningFcn, ...
    'gui_OutputFcn',  @MCT_OutputFcn, ...
    'gui_LayoutFcn',  [], ...
    'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end

function MCT_OpeningFcn(hObject, eventdata, handles, varargin)

handles.output = hObject;


guidata(hObject, handles);

function varargout = MCT_OutputFcn(hObject, eventdata, handles)

varargout{1} = handles.output;

function zf_Callback(hObject, eventdata, handles)

function zf_CreateFcn(hObject, eventdata, handles)

if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end

function q_Callback(hObject, eventdata, handles)

function q_CreateFcn(hObject, eventdata, handles)

if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end

function xd_Callback(hObject, eventdata, handles)

function xd_CreateFcn(hObject, eventdata, handles)

if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end

function xb_Callback(hObject, eventdata, handles)

function xb_CreateFcn(hObject, eventdata, handles)

if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end

function R_Callback(hObject, eventdata, handles)

function R_CreateFcn(hObject, eventdata, handles)

if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end

function alpha_Callback(hObject, eventdata, handles)

function alpha_CreateFcn(hObject, eventdata, handles)

if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end

function calculate_Callback(hObject, eventdata, handles)

alpha = str2double(get(handles.alpha,'String'));
R = str2double(get(handles.R,'String'));
q = str2double(get(handles.q,'String'));
zf = str2double(get(handles.zf,'String'));
xb = str2double(get(handles.xb,'String'));
xd = str2double(get(handles.xd,'String'));

if any([zf xb xd] >= 1) || any([zf xb xd] <= 0)
    errordlg('The molar fractions (zf,xb,xd) must be between 0 and 1!')
    return
end

if q > 1 || q < 0
    errordlg('The feed quality must be between 0 and 1 (0 <= q <= 1)!')
    return
end

if alpha < 1
    errordlg('Alpha must be greater than 1!')
    return
end

ye = 0:0.001:1;
xe = equilib(ye,alpha);

xi = (-(q-1)*(1-R/(R+1))*xd-zf)/((q-1)*R/(R+1)-q);
yi = (zf+xd*q/R)/(1+q/R);

yi2 = interp1(xe,ye,xi);
if yi > yi2
    errordlg('The distillation is not possible! Try a different operation condition.')
    return
end

axes(handles.axes1)
cla
hold on
plot(xe,ye,'r','LineWidth',1)
xlabel('X','FontWeight','bold'), ylabel('Y','FontWeight','bold')
axis([0 1 0 1])
set(line([xd xi,zf xi,xb xi],[xd yi,zf yi,xb yi]),'Color','b')
set(line([0 1],[0 1]),'Color','k')

i = 1;
xp(1) = xd;
yp(1) = xd;
y = xd;
while xp(i) > xi
    xp(i+1)= equilib(y,alpha);
    yp(i+1)= R/(R+1)*xp(i+1)+xd/(R+1);
    y = yp(i+1);
    set(line([xp(i) xp(i+1)],[yp(i) yp(i)]),'Color','m')
    text(xp(i+1),yp(i),num2str(i))
    if xp(i+1) > xi
        set(line([xp(i+1) xp(i+1)],[yp(i) yp(i+1)]),'Color','m')
    end
    i = i+1;
end

ss = (yi-xb)/(xi-xb);
yp(i) = ss*(xp(i)-xb)+xb;
y = yp(i);
set(line([xp(i) xp(i)],[yp(i-1) yp(i)]),'Color','m')

while xp(i) > xb
    xp(i+1) = equilib(y,alpha);
    yp(i+1) = ss*(xp(i+1)-xb)+xb;
    y = yp(i+1);
    set(line([xp(i) xp(i+1)],[yp(i) yp(i)]),'Color','m');
    text(xp(i+1),yp(i),num2str(i))
    if xp(i+1) > xb
        set(line([xp(i+1) xp(i+1)],[yp(i) yp(i+1)]),'Color','m')
    end
    i = i+1;
end
hold off

set(handles.numplates,'String',i-1);

function x = equilib(y,alpha)

x = y./(alpha-y*(alpha-1));

function pushbutton9_Callback(hObject, eventdata, handles)

fig2 = figure;

alpha = get(handles.alpha,'String');
R = get(handles.R,'String');
q = get(handles.q,'String');
zf = get(handles.zf,'String');
xb = get(handles.xb,'String');
xd = get(handles.xd,'String');

new_handle = copyobj(handles.axes1,fig2);
set(new_handle, 'units', 'normalized', 'position', [0.13 0.11 0.775 0.815]);
text(0.75,0.35,['zf = ' zf]); text(0.75,0.3,['q = ' q]); text(0.75,0.25,['xd = ' xd])
text(0.75,0.2,['xb = ' xb]); text(0.75,0.15,['R = ' R]); text(0.75,0.1,['alpha = ' alpha])
rectangle('Position',[0.7,0.05,0.25,0.35])

hgsave(new_handle,genvarname(['mctd_' datestr(clock, 'HHMMSS')]))

function HelpMenu_Callback(hObject, eventdata, handles)

function AboutMenu_Callback(hObject, eventdata, handles)

help.message = {{'This GUI was created following the McCabe and Thiele Graphical Method in: '; ...
    '';'McCabe, Smith and Harriott. Unit Operations of Chemical Engineering, '; ...
    'McGraw-Hill, 7th Edition, 2004.'; ...
    '';'The autor wants to acknowledge the function "McCabe-Thiele Method for an Ideal Binary Mixture" (FileID = 4472) by Housam Binous.';...
    '';'Comments, bugs or suggestions, please write to cgelmi@gmail.com'; ...
      ;'Claudio Gelmi, Pontificia Universidad Católica de Chile.'; ...
    '';'http://www.systemsbiology.cl'};'About this GUI'};
msgbox(help.message{1},help.message{2})