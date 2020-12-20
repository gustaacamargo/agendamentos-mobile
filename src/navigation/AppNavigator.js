import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer"
import Menu from "./Drawer/Menu";
import { StackLogin } from "./Login";
import { CampusTabs, CategoriesTabs, CoursesTabs, EquipamentsTabs, PlacesTabs, SchedulesTabs, UsersTabs } from "./TabNavigator";

const AppNavigator = createAppContainer(
    createSwitchNavigator(
      {
        App: createDrawerNavigator(
          {
            Agendamentos: SchedulesTabs,
            Anos: CategoriesTabs,
            Campus: CampusTabs,
            Cursos: CoursesTabs,
            Equipamentos: EquipamentsTabs,
            Salas: PlacesTabs,
            Usuarios: UsersTabs
          },
          { contentComponent: Menu }
        ),
        Auth: StackLogin,
      },
      {
        initialRouteName: "Auth"
      }
    )
);

export default AppNavigator