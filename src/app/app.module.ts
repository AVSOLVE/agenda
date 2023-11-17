import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimeNgModule } from "./primeng.module";
import { LoginComponent } from "./pages/layout/login/login.component";
import { HeaderComponent } from "./pages/layout/header/header.component";
import { EditarComponent } from "./pages/agenda/editar/editar.component";
import { CriarComponent } from "./pages/agenda/criar/criar.component";
import { CadastrarComponent } from "./pages/cadastro/cadastrar.component";
import { UserCreateComponent } from "./pages/cadastro/user-create/user-create.component";
import { StaffCreateComponent } from "./pages/cadastro/staff-create/staff-create.component";
import { FooterComponent } from "./pages/layout/footer/footer.component";
import { ConfirmationService, MessageService, SharedModule } from "primeng/api";
import { ClientCreateComponent } from "./pages/cadastro/client-create/client-create.component";
import { ProcedureCreateComponent } from "./pages/cadastro/procedure-create/procedure-create.component";
import { SidebarComponent } from "./pages/layout/sidebar/sidebar.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { HeroComponent } from "./pages/layout/hero/hero.component";
import { AgendaComponent } from "./pages/agenda/agenda.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { TableModule } from 'primeng/table';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DropdownModule } from "primeng/dropdown";
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarComponent } from "./pages/agenda/calendar/calendar.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AccordionModule } from "primeng/accordion";
import { AnimateModule } from "primeng/animate";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AutoFocusModule } from "primeng/autofocus";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BlockUIModule } from "primeng/blockui";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { ColorPickerModule } from "primeng/colorpicker";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DeferModule } from "primeng/defer";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DockModule } from "primeng/dock";
import { DragDropModule } from "primeng/dragdrop";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { EditorModule } from "primeng/editor";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FocusTrapModule } from "primeng/focustrap";
import { GalleriaModule } from "primeng/galleria";
import { ImageModule } from "primeng/image";
import { InplaceModule } from "primeng/inplace";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KeyFilterModule } from "primeng/keyfilter";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayModule } from "primeng/overlay";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollerModule } from "primeng/scroller";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SpeedDialModule } from "primeng/speeddial";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { StyleClassModule } from "primeng/styleclass";
import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeSelectModule } from "primeng/treeselect";
import { TreeTableModule } from "primeng/treetable";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AgendaComponent,
    AppComponent,
    CadastrarComponent,
    CalendarComponent,
    ClientCreateComponent,
    CriarComponent,
    EditarComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    LayoutComponent,
    LoginComponent,
    ProcedureCreateComponent,
    SidebarComponent,
    StaffCreateComponent,
    UserCreateComponent,
   ],
  imports: [
    AccordionModule,
    AnimateModule,
    AppRoutingModule,
    AutoCompleteModule,
    AutoFocusModule,
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    BlockUIModule,
    BreadcrumbModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ColorPickerModule,
    CommonModule,
    CommonModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DeferModule,
    DialogModule,
    DividerModule,
    DockModule,
    DragDropModule,
    DropdownModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FocusTrapModule,
    FormsModule,
    FullCalendarModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    KeyFilterModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenubarModule,
    MenuModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    ReactiveFormsModule,
    RippleModule,
    RouterModule,
    RouterModule,
    RouterOutlet,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SharedModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SpeedDialModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    StyleClassModule,
    TableModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    TriStateCheckboxModule,
    VirtualScrollerModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
