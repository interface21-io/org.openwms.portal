/*
 * openwms.org, the Open Warehouse Management System.
 * Copyright (C) 2014 Heiko Scherrer
 *
 * This file is part of openwms.org.
 *
 * openwms.org is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as 
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * openwms.org is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this software. If not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.openwms.portal.viewobject.impl;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * A ViewObjectEO.
 *
 * @author <a href="mailto:hscherrer@interface21.io">Heiko Scherrer</a>
 */
@Entity
@Table(name = "COR_VIEW_OBJECT")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class ViewObjectEO {

    /** Primary key. */
    @Id
    @Column(name = "C_PK")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pk;

    /** Synthetic unique key. */
    @Column(name = "C_PID", nullable = false)
    private String pKey;

    /** A unique module identifier. */
    @Column(name = "C_MODULE", nullable = false/*, unique = true*/)
    private String module;

    /** A name of the module, used in the UI. */
    @Column(name = "C_NAME", nullable = false)
    private String name;

    /** A descriptive text of the module, used in the UI. */
    @Column(name = "C_DESC")
    private String desc;

    /** The current module version .*/
    @Column(name = "C_VERSION")
    private String version;

    /** Whether the module is active and can be accessed. */
    @Column(name = "C_ACTIVE")
    private boolean active;

    /** A base64 encoded image file, used in the UI. */
    @Column(name = "C_THUMB", length = 4096)
    private String thumb;

    /** The hash when the ViewObject gets activated. */
    @Column(name = "C_HASH")
    private String hash;

    /** The actual path to this route. */
    @Column(name = "C_PATH")
    private String path;

    /** The actual path to this store. */
    @Column(name= "C_STORE_URL")
    private String storeUrl;

    /** A list of menuItems, shown in the UI. */
    @OneToMany(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "C_MENU_ITEM")
    private List<MenuItemEO> menuItems = new ArrayList<>();

    @PrePersist
    protected void onPersist() {
        this.pKey = UUID.randomUUID().toString();
    }
}
