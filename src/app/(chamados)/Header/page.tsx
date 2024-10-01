import * as React from "react"

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink  } from "@/components/ui/navigation-menu";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    children?: React.ReactNode;
  }

export default function Header({ children }: HeaderProps) {
    return (
        <div className=" bg-sky-950">
        <NavigationMenu className="h-24 list-none gap-2 ml-2">
            <NavigationMenuItem>
                    <NavigationMenuLink href="/listCategorizedTickets" className={`${navigationMenuTriggerStyle()} custom-class text-white text-xl bg-sky-950 hover:bg-sky-800 hover:text-white`}>
                        Chamados Classificados
                    </NavigationMenuLink>
            </NavigationMenuItem>                
            <NavigationMenuItem>
                    <NavigationMenuLink href="/listopenTickets" className={`${navigationMenuTriggerStyle()} custom-class text-white text-xl bg-sky-950 hover:bg-sky-800 hover:text-white`}>
                        Chamados
                    </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">User</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Condigurações</span>
                            </DropdownMenuItem>                            
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </NavigationMenuItem>
        </NavigationMenu>

        {children}
    </div>
        
    )
}